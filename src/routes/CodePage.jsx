import { PrismCode } from "./PrismCode";
class CodePage extends Component {
	code = 
		`int main(){
			int n,x;
			cin>>n>>x;
			for(int i = 0;i<n;i++){
				cout<<n<<" ";
			}
			return 0;			
		}`;
	render() {
		<PrismCode code={code}
		language="cpp"
		plugins={["line-numbers"]}/>
	}
}