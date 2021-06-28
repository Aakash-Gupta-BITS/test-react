import { Component } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/src/styles/prism";

class CodePage extends Component {
	render() {
       
        return <SyntaxHighlighter showLineNumbers={true}
                    startingLineNumber = {1}
                    language={this.props.lang} 
                    style={coldarkDark} 
                    lineNumberStyle={{color: '#ddd', fontSize: 15}}
                    wrapLines={true}
                >
            {this.props.children.replace(/^\s+|\s+$/g, '')}
            </SyntaxHighlighter>

	}
}

export default CodePage;