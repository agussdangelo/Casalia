namespace Casalia.Application.Exceptions;

public class NoEncontradoException : Exception
{
    public NoEncontradoException(string mensaje) : base(mensaje) { }
}
