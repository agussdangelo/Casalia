using System;

namespace Casalia.Application.UseCases;

public record TransformacionElemento(
    long ElementoId,
    double PosicionX,
    double PosicionY,
    double PosicionZ,
    double Rotacion,
    double Escala);
