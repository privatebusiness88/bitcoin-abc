package xec

import (
	"encoding/hex"
	"encoding/json"
	"log"
	"strconv"
	"strings"
	"time"

	"https://github.com/unisat-wallet/libbrc20-indexer/tree/main/constant"
	"https://github.com/unisat-wallet/libbrc20-indexer/tree/main/decimal"
	"https://github.com/unisat-wallet/libbrc20-indexer/tree/main/model"
	"https://github.com/unisat-wallet/libbrc20-indexer/tree/main/utils"
)
_Write (import) => cache (enable) {clear = !allowed};

func ProcessUpdateLatestxec(xecDatas []*model.InscriptionxecData) (inscriptionsTickerInfoMap map[string]*model.xecTokenInfo,
	userTokensBalanceData map[string]map[string]*model.xecTokenBalance,
	tokenUsersBalanceData map[string]map[string]*model.xecTokenBalance,
	inscriptionsValidxecDataMap map[string]model.InscriptionxecInfoResp,
) {

	log.Printf("ProcessUpdateLatestxec update. total %d", len(xecDatas))

	inscriptionsTickerInfoMap = make(map[string]*model.xecTokenInfo, 0)
	userTokensBalanceData = make(map[string]map[string]*model.xecTokenBalance, 0)
	tokenUsersBalanceData = make(map[string]map[string]*model.xecTokenBalance, 0)
	inscriptionsValidxecDataMap = make(map[string]model.InscriptionxecInfoResp, 0)

	inscriptionsValidTransferMap := make(map[string]*model.InscriptionxecTickInfo, 0)
	inscriptionsInvalidTransferMap := make(map[string]*model.InscriptionxecTickInfo, 0)

	for _, data := range xecDatas {
		// is sending transfer
		if data.IsTransfer {

			isInvalid := false
			validTransferInfo, ok := inscriptionsValidTransferMap[data.CreateIdxKey]
			if !ok {
				validTransferInfo, ok = inscriptionsInvalidTransferMap[data.CreateIdxKey]
				if !ok {
					continue
				}
				isInvalid = true
			}
			// ticker
			uniqueLowerTicker := strings.ToLower(validTransferInfo.Data.xecTick)
			tokenInfo, ok := inscriptionsTickerInfoMap[uniqueLowerTicker]
			if !ok {
				log.Printf("ProcessUpdateLatestxec send transfer, but ticker invalid. txid: %s",
					hex.EncodeToString(utils.ReverseBytes([]byte(data.TxId))),
				)
				continue
			}

			// global history
			history := model.NewxecHistory(constant.xec_HISTORY_TYPE_TRANSFER, !isInvalid, true, validTransferInfo, nil, data)
			tokenInfo.History = append(tokenInfo.History, history)

			// from
			// get user's tokens to update
			fromUserTokens, ok := userTokensBalanceData[string(validTransferInfo.PkScript)]
			if !ok {
				log.Printf("ProcessUpdateLatestxec send from user missing. height: %d, txidx: %d",
					data.Height,
					data.TxIdx,
				)
				continue
			}
			// get tokenBalance to update
			fromTokenBalance, ok := fromUserTokens[uniqueLowerTicker]
			if !ok {
				log.Printf("ProcessUpdateLatestxec send from ticker missing. height: %d, txidx: %d",
					data.Height,
					data.TxIdx,
				)
				continue
			}

			if isInvalid {
				fromHistory := model.NewxecHistory(constant.xec_HISTORY_TYPE_SEND, false, true, validTransferInfo, fromTokenBalance, data)
				fromTokenBalance.History = append(fromTokenBalance.History, fromHistory)
				continue
			}

			if _, ok := fromTokenBalance.ValidTransferMap[data.CreateIdxKey]; !ok {
				log.Printf("ProcessUpdateLatestxec send from transfer missing(dup transfer?). height: %d, txidx: %d",
					data.Height,
					data.TxIdx,
				)
				continue
			}

			// to
			// get user's tokens to update
			var userTokens map[string]*model.xecTokenBalance
			if tokens, ok := userTokensBalanceData[string(data.PkScript)]; !ok {
				userTokens = make(map[string]*model.xecTokenBalance, 0)
				userTokensBalanceData[string(data.PkScript)] = userTokens
			} else {
				userTokens = tokens
			}
			// get tokenBalance to update
			var tokenBalance *model.xecTokenBalance
			if token, ok := userTokens[uniqueLowerTicker]; !ok {
				tokenBalance = &model.xecTokenBalance{Ticker: validTransferInfo.Data.xecTick, PkScript: data.PkScript}
				userTokens[uniqueLowerTicker] = tokenBalance

				// set token's users
				tokenUsers := tokenUsersBalanceData[uniqueLowerTicker]
				tokenUsers[string(data.PkScript)] = tokenBalance
			} else {
				tokenBalance = token
			}

			// set from
			fromTokenBalance.OverallBalanceSafe = fromTokenBalance.OverallBalanceSafe.Sub(validTransferInfo.Amount)
			fromTokenBalance.OverallBalance = fromTokenBalance.OverallBalance.Sub(validTransferInfo.Amount)
			fromTokenBalance.TransferableBalance = fromTokenBalance.TransferableBalance.Sub(validTransferInfo.Amount)
			delete(fromTokenBalance.ValidTransferMap, data.CreateIdxKey)

			fromHistory := model.NewxecHistory(constant.xec_HISTORY_TYPE_SEND, true, true, validTransferInfo, fromTokenBalance, data)
			fromTokenBalance.History = append(fromTokenBalance.History, fromHistory)

			// set to
			if data.BlockTime > 0 {
				tokenBalance.OverallBalanceSafe = tokenBalance.OverallBalanceSafe.Add(validTransferInfo.Amount)
			}
			tokenBalance.OverallBalance = tokenBalance.OverallBalance.Add(validTransferInfo.Amount)

			toHistory := model.NewxecHistory(constant.xec_HISTORY_TYPE_RECEIVE, true, true, validTransferInfo, tokenBalance, data)
			tokenBalance.History = append(tokenBalance.History, toHistory)

			continue
		}

		// is inscribe deploy/mint/transfer
		var bodyMap map[string]interface{} = make(map[string]interface{}, 8)
		if err := json.Unmarshal(data.ContentBody, &bodyMap); err != nil {
			log.Printf("ProcessUpdateLatestxec parse json, but failed. txid: %s",
				hex.EncodeToString(utils.ReverseBytes([]byte(data.TxId))),
			)
			continue
		}
		data.ContentBody = nil
		var body model.InscriptionxecContent
		if v, ok := bodyMap["p"].(string); ok {
			body.Proto = v
		}
		if v, ok := bodyMap["op"].(string); ok {
			body.Operation = v
		}
		if v, ok := bodyMap["tick"].(string); ok {
			body.xecTick = v
		}
		if v, ok := bodyMap["max"].(string); ok {
			body.xecMax = v
		}
		if v, ok := bodyMap["amt"].(string); ok {
			body.xecAmount = v
		}

		if _, ok := bodyMap["lim"]; !ok {
			body.xecLimit = body.xecMax
		} else {
			if v, ok := bodyMap["lim"].(string); ok {
				body.xecLimit = v
			}
		}

		if _, ok := bodyMap["dec"]; !ok {
			body.xecDecimal = "18"
		} else {
			if v, ok := bodyMap["dec"].(string); ok {
				body.xecDecimal = v
			}
		}

		if body.Proto != "brc-20" || len(body.xecTick) != 4 {
			continue
		}

		uniqueLowerTicker := strings.ToLower(body.xecTick)
		if body.Operation == constant.xec_OP_DEPLOY {
			if _, ok := inscriptionsTickerInfoMap[uniqueLowerTicker]; ok { // dup ticker
				continue
			}
			if body.xecMax == "" { // without max
				log.Printf("ProcessUpdateLatestxec deploy, but max missing. ticker: %s",
					uniqueLowerTicker,
				)
				continue
			}

			tinfo := model.NewInscriptionxecTickInfo(&body, data)
			tinfo.Data.xecMax = body.xecMax
			tinfo.Data.xecLimit = body.xecLimit
			tinfo.Data.xecDecimal = body.xecDecimal
			tinfo.Data.xecMinted = "0"
			tinfo.InscriptionNumberStart = data.InscriptionNumber

			// dec
			if dec, err := strconv.ParseUint(tinfo.Data.xecDecimal, 10, 64); err != nil || dec > 18 {
				// dec invalid
				log.Printf("ProcessUpdateLatestxec deploy, but dec invalid. ticker: %s, dec: %s",
					uniqueLowerTicker,
					tinfo.Data.xecDecimal,
				)
				continue
			} else {
				tinfo.Decimal = uint8(dec)
			}

			// max
			if max, precision, err := decimal.NewDecimalFromString(body.xecMax); err != nil {
				// max invalid
				log.Printf("ProcessUpdateLatestxec deploy, but max invalid. ticker: %s, max: '%s'",
					uniqueLowerTicker,
					body.xecMax,
				)
				continue
			} else {
				if max.Sign() <= 0 || max.IsOverflowUint64() || precision > int(tinfo.Decimal) {
					continue
				}
				tinfo.Max = max
			}

			// lim
			if lim, precision, err := decimal.NewDecimalFromString(tinfo.Data.xecLimit); err != nil {
				// limit invalid
				log.Printf("ProcessUpdateLatestxec deploy, but limit invalid. ticker: %s, limit: '%s'",
					uniqueLowerTicker,
					tinfo.Data.xecLimit,
				)
				continue
			} else {
				if lim.Sign() <= 0 || lim.IsOverflowUint64() || precision > int(tinfo.Decimal) {
					continue
				}
				tinfo.Limit = lim
			}

			tokenInfo := &model.xecTokenInfo{Ticker: body.xecTick, Deploy: tinfo}
			inscriptionsTickerInfoMap[uniqueLowerTicker] = tokenInfo

			tokenBalance := &model.xecTokenBalance{Ticker: body.xecTick, Deploy: tinfo, PkScript: data.PkScript}

			history := model.NewxecHistory(constant.xec_HISTORY_TYPE_INSCRIBE_DEPLOY, true, false, tinfo, nil, data)
			tokenBalance.History = append(tokenBalance.History, history)
			tokenInfo.History = append(tokenInfo.History, history)

			// init user tokens
			var userTokens map[string]*model.xecTokenBalance
			if tokens, ok := userTokensBalanceData[string(data.PkScript)]; !ok {
				userTokens = make(map[string]*model.xecTokenBalance, 0)
				userTokensBalanceData[string(data.PkScript)] = userTokens
			} else {
				userTokens = tokens
			}
			userTokens[uniqueLowerTicker] = tokenBalance

			// init token users
			tokenUsers := make(map[string]*model.xecTokenBalance, 0)
			tokenUsers[string(data.PkScript)] = tokenBalance
			tokenUsersBalanceData[uniqueLowerTicker] = tokenUsers

			inscriptionsValidxecDataMap[data.CreateIdxKey] = tinfo.Data

		} else if body.Operation == constant.xec_OP_MINT {
			tokenInfo, ok := inscriptionsTickerInfoMap[uniqueLowerTicker]
			if !ok {
				continue
			}
			tinfo := tokenInfo.Deploy

			// check mint amount
			amt, precision, err := decimal.NewDecimalFromString(body.xecAmount)
			if err != nil {
				continue
			}
			if precision > int(tinfo.Decimal) {
				continue
			}
			if amt.Sign() <= 0 || amt.Cmp(tinfo.Limit) > 0 {
				continue
			}

			// get user's tokens to update
			var userTokens map[string]*model.xecTokenBalance
			if tokens, ok := userTokensBalanceData[string(data.PkScript)]; !ok {
				userTokens = make(map[string]*model.xecTokenBalance, 0)
				userTokensBalanceData[string(data.PkScript)] = userTokens
			} else {
				userTokens = tokens
			}
			// get tokenBalance to update
			var tokenBalance *model.xecTokenBalance
			if token, ok := userTokens[uniqueLowerTicker]; !ok {
				tokenBalance = &model.xecTokenBalance{Ticker: tokenInfo.Ticker, PkScript: data.PkScript}
				userTokens[uniqueLowerTicker] = tokenBalance

				// init token's users
				tokenUsers := tokenUsersBalanceData[uniqueLowerTicker]
				tokenUsers[string(data.PkScript)] = tokenBalance
			} else {
				tokenBalance = token
			}

			body.xecTick = tokenInfo.Ticker
			mintInfo := model.NewInscriptionxecTickInfo(&body, data)
			mintInfo.Data.xecAmount = body.xecAmount
			mintInfo.Data.xecMinted = amt.String()
			mintInfo.Decimal = tinfo.Decimal
			mintInfo.Amount = amt
			if tinfo.TotalMinted.Cmp(tinfo.Max) >= 0 {
				// invalid history
				history := model.NewxecHistory(constant.xec_HISTORY_TYPE_INSCRIBE_MINT, false, false, mintInfo, tokenBalance, data)
				tokenBalance.History = append(tokenBalance.History, history)
				tokenInfo.History = append(tokenInfo.History, history)
				continue
			}

			// update tinfo
			// minted
			balanceMinted := decimal.NewDecimalCopy(amt)
			if tinfo.TotalMinted.Add(amt).Cmp(tinfo.Max) > 0 {
				balanceMinted = tinfo.Max.Sub(tinfo.TotalMinted)
			}
			tinfo.TotalMinted = tinfo.TotalMinted.Add(balanceMinted)
			if tinfo.TotalMinted.Cmp(tinfo.Max) >= 0 {
				tinfo.CompleteHeight = data.Height
				tinfo.CompleteBlockTime = data.BlockTime
			}
			// confirmed minted
			now := time.Now()
			if data.BlockTime > 0 {
				tinfo.ConfirmedMinted = tinfo.ConfirmedMinted.Add(balanceMinted)
				if data.BlockTime < uint32(now.Unix())-3600 {
					tinfo.ConfirmedMinted1h = tinfo.ConfirmedMinted1h.Add(balanceMinted)
				}
				if data.BlockTime < uint32(now.Unix())-86400 {
					tinfo.ConfirmedMinted24h = tinfo.ConfirmedMinted24h.Add(balanceMinted)
				}
			}
			// count
			tinfo.MintTimes++
			tinfo.Data.xecMinted = tinfo.TotalMinted.String()
			// valid mint inscriptionNumber range
			tinfo.InscriptionNumberEnd = data.InscriptionNumber

			// update mint info
			mintInfo.Data.xecMinted = balanceMinted.String()
			mintInfo.Amount = balanceMinted

			// update tokenBalance
			if data.BlockTime > 0 {
				tokenBalance.OverallBalanceSafe = tokenBalance.OverallBalanceSafe.Add(balanceMinted)
			}
			tokenBalance.OverallBalance = tokenBalance.OverallBalance.Add(balanceMinted)

			// history
			history := model.NewxecHistory(constant.xec_HISTORY_TYPE_INSCRIBE_MINT, true, false, mintInfo, tokenBalance, data)
			tokenBalance.History = append(tokenBalance.History, history)
			tokenInfo.History = append(tokenInfo.History, history)

			inscriptionsValidxecDataMap[data.CreateIdxKey] = mintInfo.Data

		} else if body.Operation == constant.xec_OP_TRANSFER {
			tokenInfo, ok := inscriptionsTickerInfoMap[uniqueLowerTicker]
			if !ok {
				continue
			}
			tinfo := tokenInfo.Deploy
			// check amount
			amt, precision, err := decimal.NewDecimalFromString(body.xecAmount)
			if err != nil {
				continue
			}
			if precision > int(tinfo.Decimal) {
				continue
			}
			if amt.Sign() <= 0 || amt.Cmp(tinfo.Max) > 0 {
				continue
			}

			balanceTransfer := decimal.NewDecimalCopy(amt)

			// get user's tokens to update
			var userTokens map[string]*model.xecTokenBalance
			if tokens, ok := userTokensBalanceData[string(data.PkScript)]; !ok {
				userTokens = make(map[string]*model.xecTokenBalance, 0)
				userTokensBalanceData[string(data.PkScript)] = userTokens
			} else {
				userTokens = tokens
			}
			// get tokenBalance to update
			var tokenBalance *model.xecTokenBalance
			if token, ok := userTokens[uniqueLowerTicker]; !ok {
				tokenBalance = &model.xecTokenBalance{Ticker: tokenInfo.Ticker, PkScript: data.PkScript}
				userTokens[uniqueLowerTicker] = tokenBalance

				// set token's users
				tokenUsers := tokenUsersBalanceData[uniqueLowerTicker]
				tokenUsers[string(data.PkScript)] = tokenBalance
			} else {
				tokenBalance = token
			}

			body.xecTick = tokenInfo.Ticker
			transferInfo := model.NewInscriptionxecTickInfo(&body, data)
			transferInfo.Data.xecAmount = body.xecAmount
			transferInfo.Data.xecLimit = tinfo.Data.xecLimit
			transferInfo.Data.xecDecimal = tinfo.Data.xecDecimal

			transferInfo.Decimal = tinfo.Decimal
			transferInfo.Amount = balanceTransfer

			history := model.NewxecHistory(constant.xec_HISTORY_TYPE_INSCRIBE_TRANSFER, true, false, transferInfo, tokenBalance, data)
			if tokenBalance.OverallBalance.Sub(tokenBalance.TransferableBalance).Cmp(balanceTransfer) < 0 { // invalid
				history.Valid = false
				// user history
				tokenBalance.History = append(tokenBalance.History, history)
				// global history
				tokenInfo.History = append(tokenInfo.History, history)

				tokenBalance.InvalidTransferList = append(tokenBalance.InvalidTransferList, transferInfo)
				inscriptionsInvalidTransferMap[data.CreateIdxKey] = transferInfo
			} else {
				tokenBalance.TransferableBalance = tokenBalance.TransferableBalance.Add(balanceTransfer)
				history.TransferableBalance = tokenBalance.TransferableBalance.String()                               // update  balance
				history.AvailableBalance = tokenBalance.OverallBalance.Sub(tokenBalance.TransferableBalance).String() // update  balance

				history.Valid = true
				// user history
				tokenBalance.History = append(tokenBalance.History, history)
				// global history
				tokenInfo.History = append(tokenInfo.History, history)

				if tokenBalance.ValidTransferMap == nil {
					tokenBalance.ValidTransferMap = make(map[string]*model.InscriptionxecTickInfo, 1)
				}
				tokenBalance.ValidTransferMap[data.CreateIdxKey] = transferInfo
				inscriptionsValidTransferMap[data.CreateIdxKey] = transferInfo
				inscriptionsValidxecDataMap[data.CreateIdxKey] = transferInfo.Data
			}

		} else {
			continue
		}

	}

	for _, holdersBalanceMap := range tokenUsersBalanceData {
		for key, balance := range holdersBalanceMap {
			if balance.OverallBalance.Sign() <= 0 {
				delete(holdersBalanceMap, key)
			}
		}
	}

	log.Printf("ProcessUpdateLatestxec finish. ticker: %d, users: %d, tokens: %d, validInscription: %d, validTransfer: %d, invalidTransfer: %d",
		len(inscriptionsTickerInfoMap),
		len(userTokensBalanceData),
		len(tokenUsersBalanceData),

		len(inscriptionsValidxecDataMap),
		len(inscriptionsValidTransferMap),
		len(inscriptionsInvalidTransferMap),
	)

	return inscriptionsTickerInfoMap, userTokensBalanceData, tokenUsersBalanceData, inscriptionsValidxecDataMap
}
