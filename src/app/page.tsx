'use client';

import { SoundProvider } from '@/context/SoundContext';
import Desktop from '@/components/Desktop';

export default function Home() {
  return (
    <SoundProvider>
      <Desktop />
    </SoundProvider>
  );
}
