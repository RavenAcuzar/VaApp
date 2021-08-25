export class Defaults {
	private static readonly AVATAR_DEFAULT: string = "assets/imgs/avatar.png";
	private static readonly VIDEO_DEFAULT: string = "assets/imgs/video.jpg";


	public PERSON_REVERT_TO_DEFAULT (event) {
		event.target.src = Defaults.AVATAR_DEFAULT;
	}
	public VIDEO_REVERT_TO_DEFAULT (event) {
		event.target.src = Defaults.AVATAR_DEFAULT;
	}
}
