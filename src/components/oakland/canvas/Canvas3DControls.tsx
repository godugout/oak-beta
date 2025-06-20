
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Eye,
  Play,
  Pause,
  Sparkles
} from 'lucide-react';

interface Canvas3DControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  viewMode: '3d' | '2d';
  onViewModeToggle: () => void;
  autoRotate: boolean;
  onAutoRotateToggle: () => void;
  cardFinish: 'matte' | 'glossy' | 'foil';
  onCardFinishChange: (finish: 'matte' | 'glossy' | 'foil') => void;
}

const Canvas3DControls: React.FC<Canvas3DControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onReset,
  isFullscreen,
  onFullscreenToggle,
  viewMode,
  onViewModeToggle,
  autoRotate,
  onAutoRotateToggle,
  cardFinish,
  onCardFinishChange
}) => {
  return (
    <>
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#0f4c3a]/90 backdrop-blur-sm rounded-lg shadow-lg p-2 z-10 select-none">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="h-8 w-8 p-0 text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white select-none"
          disabled={zoomLevel <= 50}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        
        <Badge variant="secondary" className="px-3 min-w-[60px] text-center font-mono bg-[#ffd700] text-[#0f4c3a] select-none">
          {zoomLevel}%
        </Badge>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="h-8 w-8 p-0 text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white select-none"
          disabled={zoomLevel >= 200}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-[#ffd700]/30 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onFullscreenToggle}
          className="h-8 w-8 p-0 text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white select-none"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Top Left View Controls */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#0f4c3a]/90 backdrop-blur-sm rounded-lg shadow-lg p-2 z-10 select-none">
        <Button
          variant={viewMode === '3d' ? 'default' : 'ghost'}
          size="sm"
          onClick={onViewModeToggle}
          className={`h-8 px-3 select-none ${viewMode === '3d' 
            ? 'bg-[#ffd700] text-[#0f4c3a] hover:bg-[#ffd700]/90' 
            : 'text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white'
          }`}
        >
          <Eye className="h-4 w-4 mr-1" />
          {viewMode.toUpperCase()}
        </Button>
        
        {viewMode === '3d' && (
          <>
            <div className="w-px h-6 bg-[#ffd700]/30" />
            <Button
              variant={autoRotate ? 'default' : 'ghost'}
              size="sm"
              onClick={onAutoRotateToggle}
              className={`h-8 w-8 p-0 select-none ${autoRotate 
                ? 'bg-[#ffd700] text-[#0f4c3a] hover:bg-[#ffd700]/90' 
                : 'text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white'
              }`}
            >
              {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </>
        )}
        
        <div className="w-px h-6 bg-[#ffd700]/30" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 w-8 p-0 text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white select-none"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Bottom Controls - Card Finish */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0f4c3a]/90 backdrop-blur-sm rounded-lg shadow-lg p-2 z-10 select-none">
        <Sparkles className="h-4 w-4 text-[#ffd700]" />
        <span className="text-sm font-medium text-[#ffd700]">Finish:</span>
        
        {(['matte', 'glossy', 'foil'] as const).map((finish) => (
          <Button
            key={finish}
            variant={cardFinish === finish ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCardFinishChange(finish)}
            className={`h-8 px-3 capitalize select-none ${cardFinish === finish 
              ? 'bg-[#ffd700] text-[#0f4c3a] hover:bg-[#ffd700]/90' 
              : 'text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white'
            }`}
          >
            {finish}
          </Button>
        ))}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="absolute bottom-6 right-6 text-xs text-[#ffd700]/70 bg-[#0f4c3a]/80 backdrop-blur-sm rounded px-2 py-1 z-10 select-none">
        <div>Mouse: Drag to rotate • Wheel: Zoom</div>
        <div>R: Reset • Space: Auto-rotate • V: View mode</div>
      </div>
    </>
  );
};

export default Canvas3DControls;
