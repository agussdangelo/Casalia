using Casalia.Api.DTOs;
using Casalia.Application.Ports;
using Casalia.Application.UseCases.GuardarTransformaciones;
using Microsoft.AspNetCore.Mvc;

namespace Casalia.Api.Controllers;

[ApiController]
[Route("api/disenos/")]
public class DisenosController : ControllerBase
{
    private readonly IUsuarioActual _usuarioActual;

    public DisenosController(IUsuarioActual usuarioActual)
    {
        _usuarioActual = usuarioActual;
    }

    [HttpPut("{disenoId:long}/elementos/transformaciones")]
    public async Task<IActionResult> GuardarTransformaciones(
        long disenoId,
        GuardarTransformacionesRequest body,
        [FromServices] GuardarTransformacionesUseCase useCase,
        CancellationToken ct)
    {
        var elementos = body.Elementos
            .Select(e => new TransformacionElemento(
                e.ElementoId, e.PosicionX, e.PosicionY, e.PosicionZ, e.Rotacion, e.Escala))
            .ToList();

        var comando = new GuardarTransformacionesComando(
            disenoId, _usuarioActual.ObtenerId(), elementos);

        var resultado = await useCase.EjecutarAsync(comando, ct);
        return Ok(resultado);
    }
}