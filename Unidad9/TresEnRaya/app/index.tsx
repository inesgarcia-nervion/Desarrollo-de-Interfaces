import React from 'react';

import GameScreen from '../app/src/presentation/views/GameScreen';
import { container } from '../app/src/core/container';

export default function Index() {
  return <GameScreen viewModel={container.gameViewModel} />;
}

