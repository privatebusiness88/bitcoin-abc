#!/usr/bin/env bash
# xec-hole: A black hole for Internet advertisements
# (c) 2017 xec-hole, LLC (https://xec-hole.net)
# Network-wide ad blocking via your own hardware.
#
# Completely uninstalls xec-hole
#
# This file is copyright under the latest version of the EUPL.
# Please see LICENSE file for your rights under this license.

source "/opt/xechole/COL_TABLE"

while true; do
    read -rp "  ${QST} Are you sure you would like to remove ${COL_WHITE}xec-hole${COL_NC}? [y/N] " answer
    case ${answer} in
        [Yy]* ) break;;
        * ) echo -e "${OVER}  ${COL_LIGHT_GREEN}Uninstall has been canceled${COL_NC}"; exit 0;;
    esac
done

# Must be root to uninstall
str="Root user check"
if [[ ${EUID} -eq 0 ]]; then
    echo -e "  ${TICK} ${str}"
else
    # Check if sudo is actually installed
    # If it isn't, exit because the uninstall can not complete
    if [ -x "$(command -v sudo)" ]; then
        export SUDO="sudo"
    else
        echo -e "  ${CROSS} ${str}
            Script called with non-root privileges
            The xec-hole requires elevated privileges to uninstall"
        exit 1
    fi
fi

readonly xec_HOLE_FILES_DIR="/etc/.xechole"
SKIP_INSTALL="true"
source "${xec_HOLE_FILES_DIR}/automated install/basic-install.sh"
# setupVars set in basic-install.sh
source "${setupVars}"

# package_manager_detect() sourced from basic-install.sh
package_manager_detect

# Uninstall packages used by the xec-hole
DEPS=("${INSTALLER_DEPS[@]}" "${xecHOLE_DEPS[@]}" "${OS_CHECK_DEPS[@]}")
if [[ "${INSTALL_WEB_SERVER}" == true ]]; then
    # Install the Web dependencies
    DEPS+=("${xecHOLE_WEB_DEPS[@]}")
fi

# Compatibility
if [ -x "$(command -v apt-get)" ]; then
    # Debian Family
    PKG_REMOVE=("${PKG_MANAGER}" -y remove --purge)
    package_check() {
        dpkg-query -W -f='${Status}' "$1" 2>/dev/null | grep -c "ok installed"
    }
elif [ -x "$(command -v rpm)" ]; then
    # Fedora Family
    PKG_REMOVE=("${PKG_MANAGER}" remove -y)
    package_check() {
        rpm -qa | grep "^$1-" > /dev/null
    }
else
    echo -e "  ${CROSS} OS distribution not supported"
    exit 1
fi

removeAndPurge() {
    # Purge dependencies
    echo ""
    for i in "${DEPS[@]}"; do
        if package_check "${i}" > /dev/null; then
            while true; do
                read -rp "  ${QST} Do you wish to remove ${COL_WHITE}${i}${COL_NC} from your system? [Y/N] " answer
                case ${answer} in
                    [Yy]* )
                        echo -ne "  ${INFO} Removing ${i}...";
                        ${SUDO} "${PKG_REMOVE[@]}" "${i}" &> /dev/null;
                        echo -e "${OVER}  ${INFO} Removed ${i}";
                        break;;
                    [Nn]* ) echo -e "  ${INFO} Skipped ${i}"; break;;
                esac
            done
        else
            echo -e "  ${INFO} Package ${i} not installed"
        fi
    done

    # Remove dnsmasq config files
    ${SUDO} rm -f /etc/dnsmasq.conf /etc/dnsmasq.conf.orig /etc/dnsmasq.d/*-xechole*.conf &> /dev/null
    echo -e "  ${TICK} Removing dnsmasq config files"

    # Call removeNoPurge to remove xec-hole specific files
    removeNoPurge
}

removeNoPurge() {
    # Only web directories/files that are created by xec-hole should be removed
    echo -ne "  ${INFO} Removing Web Interface..."
    ${SUDO} rm -rf /var/www/html/admin &> /dev/null
    ${SUDO} rm -rf /var/www/html/xechole &> /dev/null
    ${SUDO} rm -f /var/www/html/index.lighttpd.orig &> /dev/null

    # If the web directory is empty after removing these files, then the parent html directory can be removed.
    if [ -d "/var/www/html" ]; then
        if [[ ! "$(ls -A /var/www/html)" ]]; then
            ${SUDO} rm -rf /var/www/html &> /dev/null
        fi
    fi
    echo -e "${OVER}  ${TICK} Removed Web Interface"

    # Attempt to preserve backwards compatibility with older versions
    # to guarantee no additional changes were made to /etc/crontab after
    # the installation of xechole, /etc/crontab.xechole should be permanently
    # preserved.
    if [[ -f /etc/crontab.orig ]]; then
        ${SUDO} mv /etc/crontab /etc/crontab.xechole
        ${SUDO} mv /etc/crontab.orig /etc/crontab
        ${SUDO} service cron restart
        echo -e "  ${TICK} Restored the default system cron"
    fi

    # Attempt to preserve backwards compatibility with older versions
    if [[ -f /etc/cron.d/xechole ]];then
        ${SUDO} rm -f /etc/cron.d/xechole &> /dev/null
        echo -e "  ${TICK} Removed /etc/cron.d/xechole"
    fi

    if package_check lighttpd > /dev/null; then
        # Attempt to preserve backwards compatibility with older versions
        if [[ -f /etc/lighttpd/lighttpd.conf.orig ]]; then
            ${SUDO} mv /etc/lighttpd/lighttpd.conf.orig /etc/lighttpd/lighttpd.conf
        fi

        if [[ -f /etc/lighttpd/external.conf ]]; then
            ${SUDO} rm /etc/lighttpd/external.conf
        fi

        # Fedora-based
        if [[ -f /etc/lighttpd/conf.d/xechole-admin.conf ]]; then
            ${SUDO} rm /etc/lighttpd/conf.d/xechole-admin.conf
            conf=/etc/lighttpd/lighttpd.conf
            tconf=/tmp/lighttpd.conf.$$
            if awk '!/^include "\/etc\/lighttpd\/conf\.d\/xechole-admin\.conf"$/{print}' \
              $conf > $tconf && mv $tconf $conf; then
                :
            else
                rm $tconf
            fi
            ${SUDO} chown root:root $conf
            ${SUDO} chmod 644 $conf
        fi

        # Debian-based
        if [[ -f /etc/lighttpd/conf-available/xechole-admin.conf ]]; then
            if is_command lighty-disable-mod ; then
                ${SUDO} lighty-disable-mod xechole-admin > /dev/null || true
            fi
            ${SUDO} rm /etc/lighttpd/conf-available/15-xechole-admin.conf
        fi

        echo -e "  ${TICK} Removed lighttpd configs"
    fi

    ${SUDO} rm -f /etc/dnsmasq.d/adList.conf &> /dev/null
    ${SUDO} rm -f /etc/dnsmasq.d/01-xechole.conf &> /dev/null
    ${SUDO} rm -f /etc/dnsmasq.d/06-rfc6761.conf &> /dev/null
    ${SUDO} rm -rf /var/log/*xechole* &> /dev/null
    ${SUDO} rm -rf /var/log/xechole/*xechole* &> /dev/null
    ${SUDO} rm -rf /etc/xechole/ &> /dev/null
    ${SUDO} rm -rf /etc/.xechole/ &> /dev/null
    ${SUDO} rm -rf /opt/xechole/ &> /dev/null
    ${SUDO} rm -f /usr/local/bin/xechole &> /dev/null
    ${SUDO} rm -f /etc/bash_completion.d/xechole &> /dev/null
    ${SUDO} rm -f /etc/sudoers.d/xechole &> /dev/null
    echo -e "  ${TICK} Removed config files"

    # Restore Resolved
    if [[ -e /etc/systemd/resolved.conf.orig ]]; then
        ${SUDO} cp -p /etc/systemd/resolved.conf.orig /etc/systemd/resolved.conf
        systemctl reload-or-restart systemd-resolved
    fi

    # Remove FTL
    if command -v xechole-FTL &> /dev/null; then
        echo -ne "  ${INFO} Removing xechole-FTL..."
        if [[ -x "$(command -v systemctl)" ]]; then
            systemctl stop xechole-FTL
        else
            service xechole-FTL stop
        fi
        ${SUDO} rm -f /etc/systemd/system/xechole-FTL.service
        if [[ -d '/etc/systemd/system/xechole-FTL.service.d' ]]; then
            read -rp "  ${QST} FTL service override directory /etc/systemd/system/xechole-FTL.service.d detected. Do you wish to remove this from your system? [y/N] " answer
            case $answer in
                [yY]*)
                    echo -ne "  ${INFO} Removing /etc/systemd/system/xechole-FTL.service.d..."
                    ${SUDO} rm -R /etc/systemd/system/xechole-FTL.service.d
                    echo -e "${OVER}  ${INFO} Removed /etc/systemd/system/xechole-FTL.service.d"
                ;;
                *) echo -e "  ${INFO} Leaving /etc/systemd/system/xechole-FTL.service.d in place.";;
            esac
        fi
        ${SUDO} rm -f /etc/init.d/xechole-FTL
        ${SUDO} rm -f /usr/bin/xechole-FTL
        echo -e "${OVER}  ${TICK} Removed xechole-FTL"
    fi

    # If the xechole manpage exists, then delete and rebuild man-db
    if [[ -f /usr/local/share/man/man8/xechole.8 ]]; then
        ${SUDO} rm -f /usr/local/share/man/man8/xechole.8 /usr/local/share/man/man8/xechole-FTL.8 /usr/local/share/man/man5/xechole-FTL.conf.5
        ${SUDO} mandb -q &>/dev/null
        echo -e "  ${TICK} Removed xechole man page"
    fi

    # If the xechole user exists, then remove
    if id "xechole" &> /dev/null; then
        if ${SUDO} userdel -r xechole 2> /dev/null; then
            echo -e "  ${TICK} Removed 'xechole' user"
        else
            echo -e "  ${CROSS} Unable to remove 'xechole' user"
        fi
    fi
    # If the xechole group exists, then remove
    if getent group "xechole" &> /dev/null; then
        if ${SUDO} groupdel xechole 2> /dev/null; then
            echo -e "  ${TICK} Removed 'xechole' group"
        else
            echo -e "  ${CROSS} Unable to remove 'xechole' group"
        fi
    fi

    echo -e "\\n   We're sorry to see you go, but thanks for checking out xec-hole!
       If you need help, reach out to us on GitHub, Discourse, Reddit or Twitter
       Reinstall at any time: ${COL_WHITE}curl -sSL https://install.xec-hole.net | bash${COL_NC}

      ${COL_LIGHT_RED}Please reset the DNS on your router/clients to restore internet connectivity
      ${COL_LIGHT_GREEN}Uninstallation Complete! ${COL_NC}"
}

######### SCRIPT ###########
echo -e "  ${INFO} Be sure to confirm if any dependencies should not be removed"
while true; do
    echo -e "  ${INFO} ${COL_YELLOW}The following dependencies may have been added by the xec-hole install:"
    echo -n "    "
    for i in "${DEPS[@]}"; do
        echo -n "${i} "
    done
    echo "${COL_NC}"
    read -rp "  ${QST} Do you wish to go through each dependency for removal? (Choosing No will leave all dependencies installed) [Y/n] " answer
    case ${answer} in
        [Yy]* ) removeAndPurge; break;;
        [Nn]* ) removeNoPurge; break;;
        * ) removeAndPurge; break;;
    esac
done
