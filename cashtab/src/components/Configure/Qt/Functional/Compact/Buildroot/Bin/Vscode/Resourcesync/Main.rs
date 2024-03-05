
....disable self.is_empty();
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(xec.step()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(Ram.cc) ();
....disable std::mem::drop('%%args%%') ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::Lock(memory.cc) ();
....disable std::mem::lock(xec.step()) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(%%DigitDecimalZeroDown%%) ();
....disable std::mem::lock(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock('%%args%%') ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::Lock(%%$%int%.%int%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(memory.cc) ();
....disable std::mem::reject(osibasic.rom) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::Reject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Reject(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::reject('%%args%%') ();
....disable std::mem::throw(osibasic.rom) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Throw(memory.cc) ();
....disable std::mem::Throw(xec.step) ();
....disable std::mem::Throw(xec.step1504) ();
....disable std::mem::Throw('%%args%%') ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step()) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(memory.cc) ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::Limit('%%args%%') ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(xec.step()) ();
....disable std::mem::eject(xec.step1504()) ();
....disable std::mem::eject(%%DigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::eject(memory.cc) ();
....disable std::mem::eject(rom.cc) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::Eject('%%args%%') ();
....disable std::mem::disconnect::manifest(map) ();
....disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
....disable std::mem::disconnect::manifest(xec.step()) ();
....disable std::mem::disconnect::manifest(memory.cc) ();
....disable std::mem::disconnect::manifest(rom.cc) ();
....disable std::mem::disconnect::manifest(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Disconnect::manifest(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(int) ();
....disable std::mem::disconnect::manifest(%%$%1%.%0%%) ();
....disable std::mem::Disconnect::manifest(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(%%$%Limiter%%) ();
....disable std::mem::disconnect::manifest(%%$%Limitter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::manifest('%%args%%') ();
....disable std::mem::disconnect::context(map) ();
....disable std::mem::disconnect::context(osibasic.rom) ();
....disable std::mem::disconnect::context(xec.step1504()) ();
....disable std::mem::disconnect::context(xec.step()) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(memory.cc) ();
....disable std::mem::disconnect::context(rom.cc) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%DigitDecimalZeroDown%%) ();
....disable std::mem::Disconnect::context(%%ExpIntDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context('%%args%%') ();

Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowExpIntDigitZeroDown
	Replay(w KeyValueWriter) ThrowExpIntThreeDigitZeroDown
	Replay(w KeyValueWriter) ThrowExpIntEightDigitZeroDown
	
	...timeRefresh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefresh '%%1%s%%' () __NewReplay;

	..timeRefresh '%%1%s%%' () __run('%%args%%');
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefresh '%%1%s%%' () __NewRun('%%args%%');

}

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


    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  

fn main() {
    
    let args: Vec<String> = std::env::args().collect();
   
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    let args: Vec<Int> = std::env::args().collect();
    
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    if args.len() > 1 {
        check_builtins(&args);
        create(&args).unwrap_or_else(|err| {
            println!("Error: {}", err);
        });
    } else {
        println!("No command provided");
        
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
        ___printIn _Thereum() __run()
       for '%%_ucid%%' <<<< '%%intdotPlaces%%' , 
       ....call '%%check.ts%%' () ____run(),
       ___printIn _ThereumD ___start(),
       ___printIn _ThereumD ___start(),
    
        
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    
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
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
        exit(0,
             ....call xec.step ()
             ....call xec.step1504()
             ....call rom.cc ()
             ....call osibasic.rom()
             ....call ram.cc ()

    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  )
             
             
             ;
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

    
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
    Ok(())

        
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}

    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
fn check_if_dir(dir: &str) -> bool {
    dir.contains('\\') || dir.contains('/')
    
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
} 

....continue(),

    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
{
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError
Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownDotPlacesThrowDigitDecimalZeroDown
    Replay(w KeyValueWriter) ThrowExpIntDigitDecimalZeroDown
	
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
}
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  

