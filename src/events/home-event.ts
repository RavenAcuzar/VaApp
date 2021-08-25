import { Events } from '@ionic/angular';

export class HomeEvent {
    public static readonly EVENT_CHANGE = "update_menu_state";

    public static stateChanged (event: Events) {
        event.publish(HomeEvent.EVENT_CHANGE);
    }
}
