export class Ambassador {
	public ID: string = "";
	public Title: string = "";
	public Position: string = "";
	public CompanyTitle: string = "";
	public Name: string = "";
	public IRID: string = "";
	public Team: string = "";
	public Email: string = "";
	public Contact: string = "";
	public Image: string = "";
	public Status: string = "";
	public Rank: string = "";
	public Description: string = "";

	constructor() {

	}

	fromJson(data: any) {

		this.ID = data.ID;
		this.Title = data.title;
		this.Position = data.position;
		this.CompanyTitle = data.companytitle;
		this.Name = data.name;
		this.IRID = data.irid;
		this.Team = data.team;
		this.Email = data.email;
		this.Contact = data.contactnum;
		this.Image = data.imgUrl.replace("http://the-v.net", "http://site.the-v.net");
		// if (data.imgUrl != "") this.Image = data.imgUrl.replace("http://the-v.net", "http://site.the-v.net");
		// else this.Image = data.imgUrl
		this.Status = data.Status;
		this.Rank = data.Rank;
		this.Description = data.NewDescription;
	}
}
