import { Component } from "react";
import Prism from "prismjs";
import "../prism.css";
require("prismjs/components/prism-c");
require("prismjs/components/prism-cpp");
require("prismjs/plugins/line-numbers/prism-line-numbers");
// require("prismjs/plugins/toolbar/prism-toolbar");
require("prismjs/plugins/highlight-keywords/prism-highlight-keywords");
require("prismjs/plugins/match-braces/prism-match-braces");
require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace");


class CodePage extends Component {
	code1 = `
#include <bits/stdc++.h>
using namespace std;

int main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(NULL);
    int T = 1;
    cin>>T;
    
    for(int t = 1;t<=T;t++)
    {
        // cout<<"Case #"<<t<<": ";
        int n,m;
        
    }

    return 0;
}
	`;
    html = Prism.highlight(this.code1, Prism.languages.cpp,'cpp');

	render() {
       
        return <pre className="line-numbers language-cpp match-braces rainbow-braces" data-start="0">
            <code className={`language-javascript`} dangerouslySetInnerHTML={{ __html: this.html }} />
        </pre>;
	}
}

export default CodePage;