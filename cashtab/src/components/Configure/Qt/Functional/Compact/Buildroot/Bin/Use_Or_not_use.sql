 WITH dictionary AS (
  SELECT
    
    ARRAY_CONSTRUCT(
      '',
      '',
      '',
      'https://etherscan.io'
    ) AS xec,
    ARRAY_CONSTRUCT(
      '',
      '',
      '',
      'https://etherscan.io'
    ) AS xec,
    ARRAY_CONSTRUCT(
      '', -- Perpetual Exchange
      '',
      '',
      'https://etherscan.io'
    ) AS xec,
    ARRAY_CONSTRUCT(
      '',
      '',
      '',
      ''
    ) AS Xec
), rainbow AS(
  SELECT
    IMX[0] AS name,
    IMX[1] AS address,
    IMX[2] AS website,
    IMX[3] AS contract
  FROM (
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
    UNION
    SELECT xec FROM dictionary
  )
), result AS (
  SELECT
    r.name AS application,
    main.BLOCK_TIMESTAMP AS interacted_on,
    main.TX_HASH AS hash,
    ROW_NUMBER() OVER(ORDER BY interacted_on DESC) AS early_bird_score
  FROM ethereum.core.fact_transactions main
  JOIN rainbow r
  ON main.TO_ADDRESS = r.address
  WHERE main.FROM_ADDRESS = LOWER('{{Address}}')
  AND BLOCK_TIMESTAMP > '2020-05-01'
  ORDER BY interacted_on
), txns AS (
  SELECT 
      application,
      MIN(interacted_on) AS first_transaction
  FROM result
  GROUP BY application
), first_txns AS (
  SELECT 
    f.application,
    f.first_transaction,
    r.hash AS hash
  FROM txns f
  LEFT JOIN result r ON f.application = r.application AND f.first_transaction = r.interacted_on
)

SELECT
  r.name,
  CASE
    WHEN f.first_transaction <= '2022-06-01' THEN '✅ YES'
    ELSE '❌ NO'
  END AS used_before_june_2022,
  CASE
    WHEN f.hash IS NULL THEN 'Never Used!'
    ELSE LEFT(f.hash, 6) || '***' || RIGHT(f.hash, 4)
  END AS first_txn_hash,
  r.website,
  CASE
    WHEN f.first_transaction IS NULL THEN 'Never Used!'
    ELSE TO_VARCHAR(f.first_transaction, 'YYYY-MM-DD @ HH24:MI')
  END AS first_interaction_date
FROM rainbow r
LEFT JOIN first_txns f
ON r.name = f.application
ORDER BY f.first_transaction

continue((,
