export class Corporate {
	public ID: string = "";
	public RunningNum: string = "";
	public Title: string = "";
	public Name: string = "";
	public CompanyTitle: string = "";
	public Contact: string = "";
	public Email: string = "";
	public Department: string = "";
	public Region: string = "";
    public Image: string = "";
    
    constructor () {

	}

	fromJson (data: any) {
		let holder: string = data.Image;

		this.ID = data.ID;
		this.RunningNum = data.runningNum;
		this.Title = data.Title;
		this.Name = data.Name;
		this.CompanyTitle = data.CompanyTitle;
		this.Contact = data.ContactNumber;
		this.Email = data.Email;
		this.Department = data.Department;
		this.Region = data.Region;
		this.Image = holder.replace("www.", "").replace("http://the-v.net", "http://site.the-v.net");
	}
}
