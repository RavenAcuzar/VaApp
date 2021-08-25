export class User {
	public ID: string = "";
	public IRID: string = "";
	public Image: string = "";
	public Name: string = "";
	public Email: string = "";
	public Type: boolean = false;
	public Contact: string = "";
	public CompanyTitle: string = "";
	public Region: string = "";
	public Class: boolean = false;
    
    constructor () {

    }

	public fromJson (data: any, kind: boolean) {
		let holder: string = data.Image;

		this.ID = data.ID;
		this.Image = holder.replace("www.", "").replace("the-v.net", "site.the-v.net");
		this.Name = data.Name;
		this.Email = data.Email;
		this.Contact = data.ContactNumber;
		this.CompanyTitle = data.CompanyTitle;
		this.Region = data.Region;
		this.Class = kind;

		if (kind) {
			this.Type = data.Type == "Poweruser";
		}

		else {
			this.Type = data.Position == "V PARTNERS";
		}
	}
}
