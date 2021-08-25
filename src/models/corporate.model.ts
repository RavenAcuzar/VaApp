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
	public Status: string = "";
	public CorporateRank: string = "";
    
    constructor () {

	}

	fromJson (data: any) {
		// console.log(data.Image)
		this.ID = data.ID;
		this.RunningNum = data.runningNum;
		this.Title = data.Title;
		this.Name = data.Name;
		this.CompanyTitle = data.CompanyTitle;
		this.Contact = data.ContactNumber;
		this.Email = data.Email;
		this.Department = data.Department;
		this.Region = data.Region;
		this.Image = data.Image;
		this.Status = data.Status;
		this.CorporateRank = data.CorporateRank;
	}
}
