using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ChatClean.Server.Models;

namespace ChatClean.Server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(clsMensajeUsuario mensaje)
        {
            await Clients.All.SendAsync("ReceiveMessage", mensaje);
        }
    }
}
