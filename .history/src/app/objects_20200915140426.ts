export class Defaults {
	private static readonly AVATAR_DEFAULT: string = "assets/imgs/avatar.png";

	public PERSON_REVERT_TO_DEFAULT (event) {
		event.target.src = Defaults.AVATAR_DEFAULT;
	}
}
