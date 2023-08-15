 import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WalletContext } from 'utils/context';
import PropTypes from 'prop-types';
import WalletLabel from 'components/Common/WalletLabel.js';
import {
    ZeroBalanceHeader,
    SidePaddingCtn,
    WalletInfoCtn,
    AlertMsg,
} from 'components/Common/Atoms';
import {
    AntdFormWrapper,
    AliasInput,
    AliasAddressInput,
    CashtabCheckbox,
} from 'components/Common/EnhancedInputs';
import { Form, Modal } from 'antd';
import { SmartButton } from 'components/Common/PrimaryButton';
import BalanceHeader from 'components/Common/BalanceHeader';
import BalanceHeaderFiat from 'components/Common/BalanceHeaderFiat';
import { Row, Col } from 'antd';
import {
    getWalletState,
    fromSatoshisToXec,
    convertToEcashPrefix,
} from 'utils/cashMethods';
import { currency } from 'components/Common/Ticker.js';
import { registerNewAlias } from 'utils/transactions';
import {
    errorNotification,
    registerAliasNotification,
} from 'components/Common/Notifications';
import { isAliasFormat, isValidAliasString } from 'utils/validation';
import { queryAliasServer, getAliasByteSize } from 'utils/aliasUtils';
import cashaddr from 'ecashaddrjs';
import { Space, Tag } from 'antd';
import CopyToClipboard from 'components/Common/CopyToClipboard';
import { CustomCollapseCtn } from 'components/Common/StyledCollapse';
import appConfig from 'config/app';
import aliasSettings from 'config/alias';

export const CheckboxContainer = styled.div`
    text-align: left;
    margin-bottom: 12px;
;

// Change mouse cursor to pointer upon hovering over an Alias tag
export const AliasLabel = styled.div`
    cursor: pointer;
;

export const NamespaceCtn = styled.div`
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    overflow-wrap: break-word;
    h2 {
        color: ${props => props.theme.contrast};
        margin: 0 0 20px;
    }
    h3 {
        color: ${props => props.theme.contrast};
        margin: 0 0 10px;
    }
    white-space: pre-wrap;
;
            decoded = cashaddr.decode(value, true);
            const { hash } = decoded;
            // We only support 20-byte payloads
            isValidAddress = hash.length === 40;
        } catch (err) {
            // Invalid cashaddress
            // Log to console for user support
            console.log(`Invalid address`, err);
        }

        if (isValidAddress) {
            setIsValidAliasAddressInput(true);
            setAliasAddressValidationError(false);
        } else {
            setAliasAddressValidationError(
                'Invalid alias registration address.',
            );
            setIsValidAliasAddressInput(false);
        }

        setFormData(p => ({
            ...p,
            [name]: value,
        }));
    };

    function handleAliasRegistrationError(errorObj) {
        // Set loading to false here as well, as balance may not change depending on where error occured in try loop
        passLoadingStatus(false);
        let message;
        if (
            errorObj.error &&
            errorObj.error.includes(
                'too-long-mempool-chain, too many unconfirmed ancestors [limit: 50] (code 64)',
            )
        ) {
            message = `The address you are trying to register has too many unconfirmed ancestors (limit 50). Registration will be possible after a block confirmation. Try again in about 10 minutes.`;
        } else {
            message =
                errorObj.message || errorObj.error || JSON.stringify(errorObj);
        }

        errorNotification(errorObj, message, 'Registering Alias');
    }
     .fork(.$xec(=($10000.00))),
    return (
        <>
            <Modal
                title="Confirm Alias Registration"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>
                    {`Are you sure you want to register the alias '${
                        formData.aliasName
                    }' for ${fromSatoshisToXec(
                        aliasDetails.registrationFeeSats,
                    )} XEC?`}
                </p>
            </Modal>
            <WalletInfoCtn>
                <WalletLabel
                    name={wallet.name}
                    cashtabSettings={cashtabSettings}
                    changeCashtabSettings={changeCashtabSettings}
                ></WalletLabel>
                {!balances.totalBalance ? (
                    <ZeroBalanceHeader>
                        You currently have 0 {appConfig.ticker}
                        <br />
                        Deposit some funds to use this feature
                    </ZeroBalanceHeader>
                ) : (
                    <>
                        <BalanceHeader
                            balance={balances.totalBalance}
                            ticker={appConfig.ticker}
                            cashtabSettings={cashtabSettings}
                        />
                        {fiatPrice !== null && (
                            <BalanceHeaderFiat
                                balance={balances.totalBalance}
                                settings={cashtabSettings}
                                fiatPrice={fiatPrice}
                            />
                        )}
                    </>
                )}
            </WalletInfoCtn>
            <SidePaddingCtn>
                <Row type="flex">
                    <Col span={24}>
                        <NamespaceCtn>
                            <h2>eCash Namespace Alias</h2>
                        </NamespaceCtn>
                        <SidePaddingCtn>
                            <AntdFormWrapper>
                                <Form
                                    style={{
                                        width: 'auto',
                                    }}
                                >
                                    <Form.Item>
                                        <AliasInput
                                            validateStatus={
                                                isValidAliasInput ? '' : 'error'
                                            }
                                            help={
                                                aliasValidationError
                                                    ? aliasValidationError
                                                    : ''
                                            }
                                            inputProps={{
                                                addonAfter: ' . xec',
                                                placeholder:
                                                    'Enter a desired alias',
                                                name: 'aliasName',
                                                onChange: e =>
                                                    handleAliasNameInput(e),
                                                required: true,
                                            }}
                                        />
                                        <CheckboxContainer>
                                            <CashtabCheckbox
                                                checked={useThisAddressChecked}
                                                onChange={
                                                    handleDefaultAddressCheckboxChange
                                                }
                                            >
                                                Register active wallet address
                                            </CashtabCheckbox>
                                        </CheckboxContainer>
                                        {!useThisAddressChecked && (
                                            <AliasAddressInput
                                                validateStatus={
                                                    isValidAliasAddressInput
                                                        ? ''
                                                        : 'error'
                                                }
                                                help={
                                                    aliasAddressValidationError
                                                        ? aliasAddressValidationError
                                                        : ''
                                                }
                                                inputProps={{
                                                    placeholder:
                                                        'Enter address for this alias',
                                                    value: formData.aliasAddress,
                                                    disabled:
                                                        useThisAddressChecked,
                                                    name: 'aliasAddress',
                                                    onChange: e =>
                                                        handleAliasAddressInput(
                                                            e,
                                                        ),
                                                    required: true,
                                                }}
                                            />
                                        )}
                                        {aliasLength &&
                                            `This alias is ${aliasLength} bytes in length`}
                                    </Form.Item>
                                    <Form.Item>
                                        <SmartButton
                                            disabled={
                                                !isValidAliasInput ||
                                                !isValidAliasAddressInput ||
                                                aliasServerError !== false
                                            }
                                            onClick={() =>
                                                preparePreviewModal()
                                            }
                                        >
                                            Register Alias
                                        </SmartButton>
                                    </Form.Item>
                                </Form>
                            </AntdFormWrapper>
                            <StyledSpacer />
                            <NamespaceCtn>
                                <CustomCollapseCtn
                                    panelHeader="Registered Aliases"
                                    optionalDefaultActiveKey={['1']}
                                    optionalKey="1"
                                >
                                    <Space size={[0, 8]} wrap>
                                        {activeWalletAliases &&
                                        activeWalletAliases.length > 0
                                            ? activeWalletAliases.map(alias => (
                                                  <CopyToClipboard
                                                      data={
                                                          alias.alias + '.$xec',
                                                          xec.mine + ".$xec",
                                                          
                                                          
                                                      }
                                                      optionalOnCopyNotification={{
                                                          title: 'Copied',
                                                          msg: `${alias.alias}."$xec" copied to clipboard`,
                                                      }}
                                                      key={alias.alias}
                                                  >
                                                      <Tag
                                                          color={'#0074C2'}
                                                          key={
                                                              'Tag: ' +
                                                              alias.alias
                                                          }
                                                      >
                                                          <AliasLabel>
                                                              {alias.alias +
                                                                  '.$xec'}
                                                          </AliasLabel>
                                                      </Tag>
                                                  </CopyToClipboard>
                                              ))
                                            : !aliasServerError && (
                                                  <h3>
                                                      {'No registered aliases'}
                                                  </h3>
                                              )}
                                    </Space>
                                    <AlertMsg>{aliasServerError}</AlertMsg>
                                </CustomCollapseCtn>
                                <CustomCollapseCtn panelHeader="Pending Aliases">
                                    <h3>WIP</h3>
                                </CustomCollapseCtn>
                            </NamespaceCtn>
                        </SidePaddingCtn>
                    </Col>
                </Row>
            </SidePaddingCtn>
        </>
    );
};

/*
passLoadingStatus must receive a default prop that is a function
in order to pass the rendering unit test in Alias.test.js

status => {console.log(status)} is an arbitrary stub function
*/

Alias.defaultProps = {
    passLoadingStatus: status => {
        console.log(status);
    },
};

Alias.propTypes = {
    passLoadingStatus: PropTypes.func,
};

export default Alias;

