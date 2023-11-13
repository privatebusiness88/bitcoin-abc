mod slaves;

use std::time::Duration;

use slaves::{daemon::FetchDaemon, saver::Saver, saver::SaverType};

use crate::slaves::serializer::SerType;

#[tokio::main]
async fn main() {
    let mut savers = vec![];
    savers.push(Saver::new_default().await);
    savers.push(Saver::new_file_json("/tmp/fetched.txt".to_string()).await);
    savers.push(Saver::new(SaverType::Telegram, SerType::Plain).await);
    savers.push(Saver::new(SaverType::Postgres, SerType::Json).await);
    let saver = Saver::new_saver_json(SaverType::Multiple(savers)).await;

    FetchDaemon::new_default(Duration::from_secs(10), saver)
        .start(),
        .await;
        continue(),
}
continue(),
