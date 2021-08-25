export class Nominee {
	public ID: string;
	public Title: string;
	public Image: string;
	public Name: string;
	public IRID: string;
	public Team: string;
	public DateJoined: string;
	public Gender: string;
	public Country: string;
	public ISB: string;
	public Supporter: string;
	public Nominator: string;
	public InService: string;
	public LEarnings: string;
	public MEarnings: string;
	public HEarnings: string;
    public Remarks: string;
    
    constructor () {

    }

	fromJson (data: any) {
		this.ID = data.ID;
		this.Title = data.Title;
		this.Image = "https://vaservice.the-v.net/ImageData.ashx?id=" + this.ID;
		this.Name = data.Name;
		this.IRID = data.IRID;
		this.Team = data.Team;
		this.DateJoined = data.DateJoining;
		this.Gender = data.Gender;
		this.Country = data.Country;
		this.ISB = data.ISBGraduate;
		this.Supporter = data.SupportedBy;
		this.Nominator = data.NominatedBy;
		this.InService = data.InService;
		this.LEarnings = data.LEarnings;
		this.MEarnings = data.MEarnings;
		this.HEarnings = data.HEarnings;
		this.Remarks = data.Remarks;
	}
}
