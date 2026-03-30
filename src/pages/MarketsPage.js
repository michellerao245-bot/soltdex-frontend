import { useState, useEffect, useCallback, useRef, useTransition } from 'react';
import axios from 'axios';

export const useMarketData = (apiBaseUrl) => {
  const [tokens, setTokens] = useState([]);
  const [inrRate, setInrRate] = useState(() => {
    const cached = localStorage.getItem('soltdex_fx_rate');
    const val = Number(cached);
    return !isNaN(val) && val > 0 ? val : 83.45;
  });
  
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [status, setStatus] = useState('fresh'); // 'fresh', 'delayed', 'stale'
  const [isPending, startTransition] = useTransition(); // 🔴 Issue #5: Concurrency Batching

  const lastUpdatedRef = useRef(new Date()); // 🔴 Issue #3: Avoid interval re-creation
  const fxRetryTimeoutRef = useRef(null); // 🔴 Issue #2: Timeout cleanup
  const fxRetryCount = useRef(0);
  const isMounted = useRef(true);

  // 🔴 Stable FX Fetch with internal AbortController (Issue #1 & #3)
  const fetchFX = useCallback(async () => {
    if (fxRetryCount.current > 10 || !isMounted.current) return;

    const fxController = new AbortController(); // 🔴 Independent Controller
    
    try {
      const res = await axios.get(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', 
        { signal: fxController.signal, timeout: 5000 }
      );
      
      const rate = res.data?.usd?.inr;
      if (rate && isMounted.current) {
        // 🔴 Wrap in Transition to prioritize UI responsiveness
        startTransition(() => {
          setInrRate(rate);
          localStorage.setItem('soltdex_fx_rate', rate.toString());
          fxRetryCount.current = 0;
        });
      }
    } catch (err) {
      if (axios.isCancel(err) || !isMounted.current) return;
      
      fxRetryCount.current += 1;
      const backoff = Math.min(Math.pow(2, fxRetryCount.current) * 1000, 300000);
      
      // 🔴 Issue #2: Clear old timeout before setting new one
      clearTimeout(fxRetryTimeoutRef.current);
      fxRetryTimeoutRef.current = setTimeout(fetchFX, backoff);
    }
  }, []);

  const fetchTokens = useCallback(async (signal) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/tokens`, { signal });
      if (isMounted.current) {
        startTransition(() => {
          setTokens(res.data || []);
          const now = new Date();
          setLastUpdated(now);
          lastUpdatedRef.current = now; // Update ref for interval check
          setStatus('fresh');
        });
      }
    } catch (err) {
      if (!axios.isCancel(err) && isMounted.current) {
        setStatus('delayed');
      }
    }
  }, [apiBaseUrl]);

  // 🔴 Issue #3: Staleness Monitor with ZERO dependencies
  useEffect(() => {
    const checkStaleness = setInterval(() => {
      const diff = (new Date() - lastUpdatedRef.current) / 1000;
      if (diff > 120) setStatus('stale');
      else if (diff > 45) setStatus('delayed');
    }, 5000);

    return () => clearInterval(checkStaleness);
  }, []); // Empty deps = interval stays alive without re-creating

  useEffect(() => {
    isMounted.current = true;
    const mainController = new AbortController();

    fetchTokens(mainController.signal);
    fetchFX();

    const tInterval = setInterval(() => fetchTokens(mainController.signal), 25000);
    const fInterval = setInterval(fetchFX, 15 * 60 * 1000);

    return () => {
      isMounted.current = false;
      mainController.abort();
      clearTimeout(fxRetryTimeoutRef.current); // 🔴 Issue #2 Fix
      clearInterval(tInterval);
      clearInterval(fInterval);
    };
  }, [fetchTokens, fetchFX]);

  return { tokens, inrRate, lastUpdated, status, isPending };
};