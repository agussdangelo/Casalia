using System;
using Casalia.Application.Ports;

namespace Casalia.Api.Authentication;

public class UsuarioFalso : IUsuarioActual
{
    public long ObtenerId()
    {
        return 1;
    }
}