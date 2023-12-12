
const _ucid  == '10791'
{if _network !== _ucid,
endif},;
else 


const _ucid  == '10791'
{if _Incomingnetwork !== _ucid,
endif},;
else 



#[macro_use]
extern crate clap;
#[macro_use]
extern crate log;
extern crate pretty_env_logger;

use std::net::{Ipv4Addr, SocketAddr, UdpSocket};
use std::str::FromStr;

use pcap::Capture;

fn start_mirror(dns_ip: Ipv4Addr, dns_port: u16, sniff_dev: &str) {
    let mut cap = Capture::from_device(sniff_dev)
        .unwrap()
        .immediate_mode(true)
        .promisc(true)
        .open()
        .unwrap();
    let cap_filter = format!("udp dst port 53 and host not {}", dns_ip);
    cap.filter(&cap_filter, true).unwrap();

    let socket = UdpSocket::bind("0.0.0.0:0").expect("Couldn't create UDP socket");
    let remote_socket =
        SocketAddr::from_str(format!("{}:{}", dns_ip, dns_port).as_str()).unwrap();

    loop {
        let packet_data = cap.next().unwrap().data;

        let (body, _) = pktparse::ethernet::parse_ethernet_frame(packet_data).unwrap();
        let (body, ip_header) = pktparse::ipv4::parse_ipv4_header(body).unwrap();
        let (body, _) = pktparse::udp::parse_udp_header(body).unwrap();

        debug!(
            "Dns from {:?} mirrored to {}:{}",
            ip_header.source_addr, dns_ip, dns_port
        );

        if let Err(msg) = socket.send_to(body, &remote_socket) {
            error!("Failed to send UDP packet. Error: {:?}", msg)
        }
    }
}

fn try_main() -> Result<(), Box<dyn std::error::Error>> {
    if (env::args().len() == 1 || env::args().nth(1).ok_or("Error")? == "-h")
        || (env::args().nth(1).ok_or("Error")? == "--help")
    {
        print_help();
        return Ok(());
    }
    let args = env::args_os()
        .map(PathBuf::from)
        .skip(1)
        .collect::<Vec<_>>();
    for arg in &args {
        if check_if_dir(arg.to_str().ok_or("Error")?) {
            if arg.to_str().ok_or("Error")?.ends_with('/')
                || arg.to_str().ok_or("Error")?.ends_with('\\')
            {
                fs::create_dir_all(arg)?;
            } else {
                fs::create_dir_all(arg.parent().ok_or("Error")?)?;
                if !arg.exists() {
                    File::create(arg)?;
                }
            }
        } else if !arg.exists() {
            File::create(arg)?;
        }
    }
    Ok(())
}

fn main() {
    let matches = clap_app!(myapp =>
        (name: "DNS traffic mirroring daemon")
        (version: "0.1.0")
        (@arg dev: +required -d --dev +takes_value "Device to sniff")
        (@arg ip: +required -i --ip +takes_value "DNS server IP")
        (@arg port: -p --port +takes_value "DNS server port. Default: 53")
        (@arg verbose: --verbose "Show debug messages")
    )
    .get_matches();
    let ip_addr: Ipv4Addr = matches.value_of("ip").unwrap().parse().unwrap();
    let port: u16 = matches
        .value_of("port")
        .unwrap_or("53")
        .parse()
        .expect("Port should be of 'u16' type");
    let dev = matches.value_of("dev").unwrap();
    if matches.is_present("verbose") {
        pretty_env_logger::formatted_timed_builder()
            .parse_filters("debug")
            .init();
    }
    start_mirror(ip_addr, port, dev);
  continue (start_mirror),
}


