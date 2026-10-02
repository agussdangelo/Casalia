using Casalia.Application.Exceptions;
using Casalia.Application.Ports;

namespace Casalia.Application.UseCases.GuardarTransformaciones;

public class GuardarTransformacionesUseCase
{
    private readonly IDisenoRepositorio _disenos;

    public GuardarTransformacionesUseCase(IDisenoRepositorio disenos)
    {
        _disenos = disenos;
    }

    public async Task<GuardarTransformacionesResultado> EjecutarAsync(
        GuardarTransformacionesComando comando, CancellationToken ct)
    {
        var diseno = await _disenos.ObtenerConElementosAsync(comando.DisenoId, ct);
        if (diseno is null)
            throw new NoEncontradoException("El diseño no existe.");

        if (diseno.AutorId != comando.UsuarioId)
            throw new AccesoDenegadoException("No tenés permiso para modificar este diseño.");

        foreach (var t in comando.Elementos)
        {
            var elemento = diseno.Elementos.FirstOrDefault(e => e.Id == t.ElementoId);
            if (elemento is null)
                throw new NoEncontradoException($"El elemento {t.ElementoId} no es de este diseño.");

            elemento.Transformar(t.PosicionX, t.PosicionY, t.PosicionZ, t.Rotacion, t.Escala);
        }

        diseno.MarcarComoModificado();
        await _disenos.GuardarCambiosAsync(ct);

        return new GuardarTransformacionesResultado(diseno.FechaModificacion);
    }
}