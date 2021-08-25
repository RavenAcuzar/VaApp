import { Events } from '@ionic/angular';

export class LoginEvents {
	public static readonly EVENT_CHANGE = "update_menu_state";

	public static stateChanged (event: Events) {
		event.publish(LoginEvents.EVENT_CHANGE);
	}
}
