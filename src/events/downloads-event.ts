import { Events } from '@ionic/angular';

export class DownloadsEvent {
    public static readonly EVENT_CHANGE = "update_menu_state";

    public static stateChange (event: Events) {
        event.publish(DownloadsEvent.EVENT_CHANGE);
    }
}
