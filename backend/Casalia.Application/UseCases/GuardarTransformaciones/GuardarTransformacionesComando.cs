namespace Casalia.Application.UseCases.GuardarTransformaciones;

public record GuardarTransformacionesComando(
    long DisenoId,
    long UsuarioId,
    IReadOnlyList<TransformacionElemento> Elementos);