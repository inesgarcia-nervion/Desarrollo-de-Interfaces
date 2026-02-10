import { SignalRConnection } from '../data/datasources/SignalRConnection';
import { RoomRepository } from '../data/repositories/RoomRepository';
import { GameRepository } from '../data/repositories/GameRepository';
import { ObtenerListaSalasUseCase } from '../domain/usecases/room/ObtenerListaSalasUseCase';
import { CrearSalaUseCase } from '../domain/usecases/room/CrearSalaUseCase';
import { UnirseASalaUseCase } from '../domain/usecases/room/UnirseASalaUseCase';
import { RoomListViewModel } from '../presentation/viewmodels/RoomListViewModel';
import { GameViewModel } from '../presentation/viewmodels/GameViewModel';
import { HacerMovimientoUseCase } from '../domain/usecases/game/HacerMovimientoUseCase';
import { EscucharEventosDelJuegoUseCase } from '../domain/usecases/game/EscucharEventosDelJuegoUseCase';
import { ConectarseAlJuegoUseCase } from '../domain/usecases/game/ConectarseAlJuegoUseCase';
import { DesconectarseDelJuegoUseCase } from '../domain/usecases/game/DesconectarseDelJuegoUseCase';

const signalRConnection = new SignalRConnection(
  'https://tresenraya-hpgqdvh2fqg9f8dj.italynorth-01.azurewebsites.net/hub'
);

const roomRepo = new RoomRepository(signalRConnection);
const gameRepo = new GameRepository(signalRConnection);

export const container = {
  signalRConnection,

  roomListViewModel: new RoomListViewModel(
    new ObtenerListaSalasUseCase(roomRepo),
    new CrearSalaUseCase(roomRepo),
    new UnirseASalaUseCase(roomRepo),
    signalRConnection // ✅ necesario para la escucha continua
  ),

  gameViewModel: new GameViewModel(
    new HacerMovimientoUseCase(gameRepo),
    new EscucharEventosDelJuegoUseCase(gameRepo),
    new ConectarseAlJuegoUseCase(gameRepo),
    new DesconectarseDelJuegoUseCase(gameRepo),
    gameRepo
  ),
};