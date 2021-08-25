export class Defaults {
	private static readonly AVATAR_DEFAULT: string = "assets/imgs/avatar.png";
	private static readonly VIDEO_DEFAULT: string = "assets/imgs/video.jpg";
	private static readonly TEAM_LOGO_DEFAULT: string = "assets/imgs/team-placeholder.png";


	public PERSON_REVERT_TO_DEFAULT (event) {
		event.target.src = Defaults.AVATAR_DEFAULT;
	}
	public VIDEO_REVERT_TO_DEFAULT (event) {
		event.target.src = Defaults.VIDEO_DEFAULT;
	}
	public TEAM_LOGO_TO_DEFAULT (event){
		event.target.src = Defaults.TEAM_LOGO_DEFAULT;
	}
}
