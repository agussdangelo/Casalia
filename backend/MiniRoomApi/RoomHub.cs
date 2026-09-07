using Microsoft.AspNetCore.SignalR;

// Este Hub es el corazón de la colaboración en tiempo real de tu propuesta.
// Cada método público acá es algo que el frontend puede "invocar" en vivo.
public class RoomHub : Hub
{
    // El cliente (React) llama a esto cuando alguien escribe en el chat.
    // Broadcast: le llega a TODOS los conectados al hub (en tu proyecto real,
    // filtrarías por proyecto/sala en vez de mandarlo a todo el mundo).
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Ejemplo de cómo se vería un "comentario anclado a un objeto":
    // se manda el id del objeto 3D junto con el comentario.
    public async Task SendPinnedComment(string objectId, string user, string comment)
    {
        await Clients.All.SendAsync("ReceivePinnedComment", objectId, user, comment);
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("ReceiveMessage", "Sistema", "Un usuario se conectó.");
        await base.OnConnectedAsync();
    }
}
