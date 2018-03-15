import React, { Component } from 'react';
import { getVPNList, getVPNUsageData } from '../Actions/AccountActions';
import ZoomIn from 'material-ui/svg-icons/content/add';
import ZoomOut from 'material-ui/svg-icons/content/remove';
import { IconButton } from "material-ui";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from 'react-simple-maps';
import { sendError } from '../helpers/ErrorLog';
import clear from 'material-ui/svg-icons/content/clear';

var markers = []

var UsageInterval = null;
class VPNComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            isGetVPNCalled: false,
            isUsageCalled: false,
            usage: null
        }
        this.handleZoomIn = this.handleZoomIn.bind(this)
        this.handleZoomOut = this.handleZoomOut.bind(this)
    }

    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
    }

    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }
    handleClick(marker, evt) {
        console.log("Marker data: ", marker)
    }
    componentWillMount = () => {
        this.getVPNs()
    }

    getVPNs() {
        getVPNList(function (err, data) {
            if (err) sendError(err);
            else {
                markers = []
                data.map((vpn, i) => {
                    var vpnServer = {
                        name: vpn.location.city,
                        coordinates: [vpn.location.longitude, vpn.location.latitude]
                    }
                    markers.push(vpnServer);
                })
            }
        })
    }

    getUsage() {
        let self = this;
        getVPNUsageData(this.props.local_address, function (err, usage) {
            if (err) {
                console.log('Err', err);
            }
            else {
                self.setState({ usage: usage })
            }
        })
    }

    render() {
        let that = this;
        if (!this.state.isGetVPNCalled) {
            setInterval(function () {
                that.getVPNs()
            }, 60000);

            this.setState({ isGetVPNCalled: true });
        }
        if (!UsageInterval && this.props.status) {
            UsageInterval = setInterval(function () {
                that.getUsage()
            }, 5000);
        }
        if (!this.props.status) {
            if (UsageInterval) {
                clearInterval(UsageInterval);
                UsageInterval=null;
            }
        }
        return (
            <div>
                <IconButton onClick={this.handleZoomIn} style={{ position: 'absolute' }} tooltip="Zoom In">
                    <ZoomIn />
                </IconButton>
                <IconButton onClick={this.handleZoomOut} style={{ position: 'absolute', marginLeft: '3%' }}
                    tooltip="Zoom Out">
                    <ZoomOut />
                </IconButton>
                <div style={styles.vpnDetails}>
                    {this.props.status === true ?
                        <div style={{ fontSize: 14 }}>
                            <p>IP: {this.props.vpnData.ip}</p>
                            <p>Location: {this.props.vpnData.location}</p>
                            <p>Speed: {this.props.vpnData.speed}</p>
                            <p>Download Usage: {this.state.usage === null ? 0.00 : (parseInt(this.state.usage.down) / (1024 * 1024)).toFixed(2)} MB</p>
                            <p>Upload Usage: {this.state.usage === null ? 0.00 : (parseInt(this.state.usage.up) / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        :
                        <div>No VPN Connected</div>
                    }
                </div>
                <hr />
                <ComposableMap
                    projectionConfig={{ scale: 200 }}
                    style={this.props.isTest ? {
                        width: "100%",
                        height: 400
                    } : { width: "100%" }}
                >
                    <ZoomableGroup zoom={this.state.zoom}>
                        <Geographies geography="../src/Components/world-50m.json">
                            {(geographies, projection) => geographies.map(geography => (
                                <Geography
                                    key={geography.id}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: "#ECEFF1",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#CFD8DC",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))}
                        </Geographies>
                        <Markers>
                            {markers.map((marker, i) => (
                                <Marker
                                    onMouseEnter={(marker, event) => {
                                        document.getElementById(marker.name).style.visibility = "visible";
                                    }}
                                    onMouseLeave={(marker, event) => {
                                        document.getElementById(marker.name).style.visibility = "hidden";
                                    }}
                                    key={i}
                                    marker={marker}
                                    style={{
                                        default: { stroke: "#0cef0c" },
                                        hover: { stroke: "#FF5722" },
                                        pressed: { stroke: "#FF5722" },
                                    }}
                                >
                                    <g transform="translate(-12, -24)">
                                        <path
                                            fill="none"
                                            strokeWidth="2"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeLinejoin="miter"
                                            d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                                        />
                                        <circle
                                            fill="none"
                                            strokeWidth="2"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeLinejoin="miter"
                                            cx="12"
                                            cy="9"
                                            r="3"
                                        />
                                    </g>
                                    <text
                                        id={marker.name}
                                        textAnchor="middle"
                                        y={-35}
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fill: "#607D8B",
                                            stroke: "none",
                                            visibility: "hidden",
                                        }}
                                    >
                                        {marker.name}
                                    </text>
                                </Marker>
                            ))}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
            </div >
        )
    }
}

const styles = {
    vpnDetails: {
        position: "absolute",
        bottom: 0,
        right: 10,
        backgroundColor: '#3e4f5a',
        padding: '2%',
        color: 'white'
    },
    testVpnDetails: {
        position: "absolute",
        bottom: 0,
        right: 10,
        marginBottom: 45,
        backgroundColor: '#3e4f5a',
        padding: '2%',
        color: 'white'
    }
}

export default VPNComponent;