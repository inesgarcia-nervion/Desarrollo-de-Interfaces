import { SignalRApi } from '../Data/Api/SignalRApi';
import { ChatRepository } from '../Data/Repositories/ChatRepository';
import { SendMessageUseCase } from '../Domain/Usecases/Chat/SendMessageUseCase';
import { GetMessagesUseCase } from '../Domain/Usecases/Chat/GetMessagesUseCase';

const signalRApi = new SignalRApi();
const chatRepository = new ChatRepository(signalRApi);
const sendMessageUseCase = new SendMessageUseCase(chatRepository);
const getMessagesUseCase = new GetMessagesUseCase(chatRepository);

  signalRApi,
  chatRepository,
  sendMessageUseCase,
  getMessagesUseCase,
};
