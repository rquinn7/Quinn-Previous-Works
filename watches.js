//Ryan Quinn
// note the name of the class must be capitalized 
class MyWatchDisplay extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            watchIndex: 0,
            watches: [],
            order: [],
            selectedIndices: [],
            isLoading: true
        }

        //this.handleDressingChange = this.handleDressingChange.bind(this);
        //this.handleLettuceChange = this.handleLettuceChange.bind(this);
        //this.handleFixingChange = this.handleFixingChange.bind(this);
    }

    handleWatchChange = e => {
        // setState() is async
        this.setState({ watchIndex: e.target.value });
        console.log("change");
    }


    //###############################################################
    //READ JSON FILE
    componentDidMount() {
        //this.setState({ isLoading: true });
        fetch('watch_data.json')
            .then(response => response.json())
            .then(data => {
                let index = Math.floor(Math.random() * data["watches"].length);
                this.setState({ watches: data["watches"], isLoading: false , watchIndex:index})
            });
    }



    render() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>)
        } else {

            return (
                <> { }
                    <div className="box"  >
                        <h2>Watches</h2>
                        {
                            this.state.watches.map((watch, i) => {
                                if (i == this.state.watchIndex) {
                                    return (
                                        <div key={"div_watch_" + i}>
                                            <input key={"radio_watch_" + i} id={"watch_" + i} type="radio" name="watch" defaultChecked="checked" value={i} onChange={this.handleWatchChange} />
                                            <label key={"label_watch_" + i} htmlFor={"watch_" + i}>
                                                {watch.name}
                                            </label>
                                            <br />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={"div_watch_" + i}>
                                            <input key={"radio_watch_" + i} id={"watch_" + i} type="radio" name="watch" value={i} onChange={this.handleWatchChange} />
                                            <label key={"label_watch_" + i} htmlFor={"watch_" + i}>
                                                {watch.name}
                                            </label>
                                            <br />
                                        </div>
                                    )

                                }
                            }
                            )
                        }

                    </div>
                    <div className="box"  >
                        <h2>Images</h2>
                        <img src={"resources/" + this.state.watches[this.state.watchIndex].resource + ".jpg"} width="250" />
                    </div>
                    <div className="box"  >
                        <h2>Prices</h2>
                        <div> Price: ${this.state.watches[this.state.watchIndex].price * 1000}</div>
                        <div> Diameter: {this.state.watches[this.state.watchIndex].diameter} mm</div>
                        <div> Water Resistance: {this.state.watches[this.state.watchIndex].water_resist} m</div>
                    </div>
                    <div className="box" style={{ gridColumn: "1/span 3", gridRow: "7 / span 7" }}>
                        <iframe width="800" height="150" src={"resources/" + this.state.watches[this.state.watchIndex].resource + ".txt"}></iframe>
                    </div>
                </>
            ) //match return
        } //match render
    }
} //end Room Reserve class

const divWatches = ReactDOM.createRoot(document.querySelector('#divWatchesDisplay'));
// call the render method  -- only one parent can be rendered -- so add surrounding div
divWatches.render(<MyWatchDisplay />);
