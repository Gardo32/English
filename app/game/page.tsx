import dynamic from 'next/dynamic';

export default function GamePage() {
  const Game = dynamic(() => import('@/components/Game'), {
    ssr: false  // Disable server-side rendering for this component
  });

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Game />
    </div>
  )
}