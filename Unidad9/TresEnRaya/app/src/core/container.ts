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

const signalR = new SignalRConnection('http://192.168.1.23:7037/hub');
// Conexión con Azure
// const signalR = new SignalRConnection('https://TUAPP.azurewebsites.net/hub');
signalR.conectar();


const roomRepo = new RoomRepository(signalR);
const gameRepo = new GameRepository(signalR);

export const container = {
  roomListViewModel: new RoomListViewModel(
    new ObtenerListaSalasUseCase(roomRepo),
    new CrearSalaUseCase(roomRepo),
    new UnirseASalaUseCase(roomRepo)
  ),
  gameViewModel: new GameViewModel(
    new HacerMovimientoUseCase(gameRepo),
    new EscucharEventosDelJuegoUseCase(gameRepo),
    new ConectarseAlJuegoUseCase(gameRepo),
    new DesconectarseDelJuegoUseCase(gameRepo)
  ),
};
