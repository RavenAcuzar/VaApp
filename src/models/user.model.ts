export class User {
	public ID: string = '';
	public IRID: string = '';
	public Image: string = '';
	public Name: string = '';
	public Email: string = '';
	public Type: string = '';
	public Contact: string = '';
	public CompanyTitle: string = '';
	public Region: string = '';
	public Class: boolean = false;
	public Description: string ='';
	public Department: string='';
    constructor () {

    }

	public fromJson (data: any, kind: boolean) {
		//let holder: string = data.Image;

		this.ID = data.ID;
		this.Image = data.Image;
		this.Name = data.Name;
		this.Email = data.Email;
		this.Contact = data.ContactNumber;
		this.CompanyTitle = data.CompanyTitle;
		this.Region = data.Region;
		this.Class = kind;
		this.Description = data.Description;
		this.Department = data.Department;
		this.IRID = data.Irid;

		if (kind) {
			//Poweruser or Normal
			this.Type = data.Type;
		} else {	
			//V PARTNERS, ASSOCIATE V PARTNERS, V COUNCILS
			this.Type = data.Position;
		}
	}
}
