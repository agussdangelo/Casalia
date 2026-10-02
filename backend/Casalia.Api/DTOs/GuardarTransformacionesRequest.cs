namespace Casalia.Api.DTOs;
public record TransformacionElementoRequest(
    long ElementoId,
    double PosicionX,
    double PosicionY,
    double PosicionZ,
    double Rotacion,
    double Escala);

public record GuardarTransformacionesRequest(
    IReadOnlyList<TransformacionElementoRequest> Elementos);