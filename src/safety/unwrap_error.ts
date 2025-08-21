export class UnwrapError extends Error
{
	constructor()
	{
		super("The `.unwrap()` function is called on a `None` value.");
	}
}
