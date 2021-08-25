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
    
    constructor () {

	}

	fromJson (data: any) {
		let holder: string = data.imgUrl;

		this.ID = data.ID;
		this.Title = data.title;
		this.Position = data.position;
		this.CompanyTitle = data.companytitle;
		this.Name = data.name;
		this.IRID = data.irid;
		this.Team = data.team;
		this.Email = data.email;
		this.Contact = data.contactnum;
		this.Image = holder.replace("www.", "").replace("the-v.net", "site.the-v.net");
		this.Status = data.Status;
		this.Rank = data.Rank;
		this.Description = data.NewDescription;
	}
}
