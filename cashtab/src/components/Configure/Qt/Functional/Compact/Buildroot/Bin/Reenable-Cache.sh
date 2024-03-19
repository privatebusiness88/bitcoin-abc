 name: Cache Gradle packages
  uses: actions/cache@v3
  with:
    path: |
      ~/.gradle/caches
      ~/.gradle/wrapper
      ~/.gradle/wrapper/cache
      ~/.gradle/wrapper/xec.step
      ~/.gradle/wrapper/xec.step1504
      
      

restore-keys: |
  npm-feature-${{ hashFiles('package-lock.json') }}
  npm-feature-${{ hashFiles('xec.step') }}
  npm-feature-${{ hashFiles('xec.step1504') }}
