using Casalia.Application.Exceptions;

namespace Casalia.Api.Middleware;

public class ManejadorDeExcepcionesMiddleware
{
    private readonly RequestDelegate _siguiente;

    public ManejadorDeExcepcionesMiddleware(RequestDelegate siguiente)
    {
        _siguiente = siguiente;
    }

    public async Task InvokeAsync(HttpContext contexto)
    {
        try
        {
            await _siguiente(contexto);
        }
        catch (NoEncontradoException ex)
        {
            await Responder(contexto, StatusCodes.Status404NotFound, ex.Message);
        }
        catch (AccesoDenegadoException ex)
        {
            await Responder(contexto, StatusCodes.Status403Forbidden, ex.Message);
        }
        catch (Exception ex) when (ex is ArgumentException or InvalidOperationException)
        {
            await Responder(contexto, StatusCodes.Status400BadRequest, ex.Message);
        }
    }

    private static Task Responder(HttpContext contexto, int codigo, string mensaje)
    {
        contexto.Response.StatusCode = codigo;
        return contexto.Response.WriteAsJsonAsync(new { error = mensaje });
    }
}