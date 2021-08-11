import React from "react";

export class parser extends React.Component {
    render() {
        if (!this.props.datos) {
            return <></>;
        }
        return (<table>
            {this.props.datos.map(e =>
                <tr>
                    <td>{e.id}</td>
                    <td>{e.state}</td>
                </tr>)
            }
        </table>);
    }
}
