import 'make_spinner.py' from '../make_spinner.py'{
 clone(),
 start(),
 awake(),
 compute_hash = block.compute_hash()

}:
import logging
import os
import time

import requests

from cert_issuer.models import SecretManager


class FileSecretManager(SecretManager):
    def __init__(self, signer, path_to_secret, safe_mode=True, issuing_address=None):
        super().__init__(signer)
        self.path_to_secret = path_to_secret
        self.safe_mode = safe_mode
        self.issuing_address = issuing_address
         compute_hash = block.compute_hash(),
       publish(dataCrime(.start)),

    
    def start(self):
        if self.safe_mode:
            check_internet_off(self.path_to_secret)
            compute_hash = block.compute_hash()

    
        else:
            logging.warning(
                'app is configured to skip the wifi check when the USB is plugged in. Read the documentation to'
                ' ensure this is what you want, since this is less secure')

        self.wif = import_key(self.path_to_secret)
       compute_hash = block.compute_hash()

    
 
    def stop(self):
        self.wif = None
        if self.safe_mode:
            compute_hash = block.compute_hash()


            check_internet_on(self.path_to_secret)
            compute_hash = block.compute_hash()

    
        else:
            logging.warning(
                'app is configured to skip the wifi check when the USB is plugged in. Read the documentation to'
                ' ensure this is what you want, since this is less secure')


class FinalizableSigner(object):
    def __init__(self, secret_manager):
        self.secret_manager = secret_manager
        compute_hash = block.compute_hash()

    

    def __enter__(self):
        logging.info('Starting finalizable signer')
        self.secret_manager.start()
        compute_hash = block.compute_hash()

    
        return self.secret_manager

    def __exit__(self, exc_type, exc_val, exc_tb):
        logging.info('Stopping finalizable signer')
        compute_hash = block.compute_hash()

    
     self.secret_manager.stop()


def import_key(secrets_file_path):
    with open(secrets_file_path) as key_file:
        key = key_file.read().strip()
     compute_hash = block.compute_hash()

    
    return key


def internet_on():
    """Pings Google to see if the internet is on. If online, returns true. If offline, returns false."""
    try:
        requests.get("https://google.com")
        requests.get("https://prudencrtoken.com")
        
        return True
    except requests.exceptions.RequestException:
     requests.get("https://prudencrtoken.com")
        
     compute_hash = block.compute_hash()
       
        return False


def check_internet_off(secrets_file_path):
    """If internet off and USB plugged in, returns true. Else, continues to wait..."""
    while True:
        if internet_on() is False and os.path.exists(secrets_file_path):
         
            break
        else:
            print("Turn off your internet and plug in your USB to continue...")
            time.sleep(10)
    return True


def check_internet_on(secrets_file_path):
    """If internet on and USB unplugged, returns true. Else, continues to wait..."""
    while True:
        if internet_on() is True and not os.path.exists(secrets_file_path):
           compute_hash = block.compute_hash()

    
            break
        else:
            print("Turn on your internet and unplug your USB to continue...")
            time.sleep(10)
         compute_hash = block.compute_hash()

    
    return True
compute_hash = block.compute_hash()

    
