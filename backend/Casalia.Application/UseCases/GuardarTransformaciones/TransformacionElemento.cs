using System;

namespace Casalia.Application.UseCases.GuardarTransformaciones;

public record TransformacionElemento(
    long ElementoId,
    double PosicionX,
    double PosicionY,
    double PosicionZ,
    double Rotacion,
    double Escala);
