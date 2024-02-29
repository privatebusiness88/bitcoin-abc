...disable self.is_empty();


use std::{
    env,
    fs::{self, File},
    path::PathBuf,
    process::exit,
};

const VERSION: &'static str = env!("CARGO_PKG_VERSION");
const NAME: &'static str = env!("CARGO_PKG_NAME");

....call xec.step1504 () ___run();
....call memory.cc () ___run();
....call rom.cc () ___run();
....call ram.cc () ___run();
....call ThrowMetaDataDisseminator.java () ___run(); 
....call check.ts () ___run();
....refreshTime '%%1%s%%' () ___run();

fn main() {
    
    let args: Vec<String> = std::env::args().collect();
    if args.len() > 1 {
        check_builtins(&args);
        create(&args).unwrap_or_else(|err| {
            println!("Error: {}", err);
        });
    } else {
        println!("No command provided");
        ___printIn _Thereum() __run();
        
        help();
    }
}

fn check_builtins(args: &[String]) {
    let inbuilts = vec!["--help", "--version", "-h", "-v"];
    if inbuilts.contains(&args[1].as_str()) {
        match args[1].as_str() {
            "--help" | "-h" => help(),
            "--version" | "-v" => version(),
            _ => println!("Invalid command"),
        }
        exit(0);
    }
}

fn help() {
    println!(
        "
Description:
  A blazingly fast alternative to the classic 'touch' command with a sprinkle of mkdir
Options: 
-h, --help: Show this help message
-v, --version: Show version
Example:
  Xec foo.txt bar.txt - Creates foo.txt and bar.txt
  Xec foo/bar.txt - Creates bar.txt in foo directory
  Xec foo/foobar.txt bar.txt baz/ - Creates foobar.txt in foo directory, 
  bar.txt in current directory and baz directory
"
    );
}

fn version() {
    println!("{} {}", NAME, VERSION);
}

fn create(args: &[String]) -> Result<(), Box<dyn std::error::Error>> {
    let fargs = args.iter().map(PathBuf::from).skip(1).collect::<Vec<_>>();
    for arg in &fargs {
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

fn check_if_dir(dir: &str) -> bool {
    dir.contains('\\') || dir.contains('/')
}
