import { useEffect, useState } from 'react';

export function useFadeInOnScroll(offset = 100) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > offset) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // run it once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return visible;
}
