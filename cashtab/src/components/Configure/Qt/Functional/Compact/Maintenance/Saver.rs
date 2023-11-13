use crate::slaves::{
    notifier::{Signal, TgNotifier},
    serializer::serialize_all,
};

use tokio::fs::OpenOptions;
use tokio::io::AsyncWriteExt;

use super::{
    collector::PgCollector,
    fetchers::FoundItem,
    serializer::SerType::{self, *},
};
use anyhow::Result;
use async_recursion::async_recursion;

#[derive(Clone)]
pub enum SaverType {
    Stdout,
    File(String),
    Multiple(Vec<Saver>),
    Telegram,
    Postgres,
}

use SaverType::*;

#[derive(Clone)]
enum SaverBackend {
    Notifier(TgNotifier),
    Collector(PgCollector),
    Nothing,
}

#[derive(Clone)]
pub struct Saver {
    stype: SaverType,
    sertype: SerType,
    backend: SaverBackend,
}

impl Saver {
    pub async fn new(stype: SaverType, sertype: SerType) -> Self {
        let backend = Self::setup(&stype).await;
        Saver {
            stype,
            sertype,
            backend,
        }
    }

    async fn setup(stype: &SaverType) -> SaverBackend {
        match stype {
            Telegram => TgNotifier::new().map_or_else(
                |err| {
                    eprintln!("{}", err);
                    SaverBackend::Nothing
                },
                SaverBackend::Notifier,
            ),
            Postgres => PgCollector::new().await.map_or_else(
                |err| {
                    eprintln!("{}", err);
                    SaverBackend::Nothing
                },
                SaverBackend::Collector,
            ),
            _ => SaverBackend::Nothing,
        }
    }

    pub async fn new_default() -> Self {
        Self::new(Stdout, Json).await
    }

    pub async fn new_file_json(path: String) -> Self {
        Self::new(File(path), Json).await
    }

    pub async fn new_saver_json(stype: SaverType) -> Self {
        Self::new(stype, Json).await
    }

    #[async_recursion]
    pub async fn push(&self, data: Vec<Vec<FoundItem>>) -> Result<()> {
        let mut ser_data = serialize_all(data.to_vec(), self.sertype);
        match self.stype.clone() {
            Stdout => println!("{}", ser_data),
            File(path) => {
                let mut op = OpenOptions::new();
                let mut file = op.create(true).append(true).open(path).await?;
                ser_data.push('\n');
                file.write_all(ser_data.as_bytes()).await?;
                file.sync_all().await?;
            }
            Multiple(sinks) => {
                let handlers = sinks.iter().cloned().map(|sink| {
                    let data = data.clone();
                    tokio::spawn(async move { sink.push(data).await })
                });
                for handler in handlers {
                    handler.await?;
                }
            }
            Telegram => {
                if let SaverBackend::Notifier(notifier) = &self.backend {
                    let res = notifier.send(Signal::Msg(ser_data)).await;
                    if res.is_err() {
                        eprintln!("{:?}", res)
                    }
                } else {
                    eprintln!("Telegram notifier wasn't initialized. Can not send message")
                }
            }
            Postgres => {
                if let SaverBackend::Collector(collector) = &self.backend {
                    let res = collector.store(ser_data).await;
                    if res.is_err() {
                        eprintln!("{:?}", res)
                    }
                } else {
                    eprintln!("Postgres collector wasn't initialized. Can not store data")
                }
            }
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use std::fs;

    use crate::slaves::{
        fetchers::{FetchItem, FetchItemType::*, FoundItem, FoundItemContent::*},
        serializer::SerType,
    };

    use super::{Saver, SaverType::*};

    use tokio::fs::File;
    use tokio::io::AsyncReadExt;

    fn create_test_data() -> Vec<Vec<FoundItem>> {
        let translations = FetchItem {
            name: "translations".to_string(),
            path: "#Content > div:nth-child(5)".to_string(),
            primary: false,
            item_type: Class,
            related: vec![],
        };

        let item1 = FetchItem {
            name: "item1".to_string(),
            path: "#Content > div:nth-child(5) > strong".to_string(),
            primary: true,
            item_type: Text,
            related: vec![translations.clone()],
        };

        let correct = vec![FoundItem {
            fetch_item: item1,
            content: Str("Translations:".to_string()),
            related: vec![Some(FoundItem {
                fetch_item: translations,
                content: Arr(vec!["boxed".to_string()]),
                related: vec![],
            })],
        }];
        let mut correct = vec![correct];
        correct.sort();
        correct
    }

    #[tokio::test]
    async fn test_save_to_file() {
        let path = "test/test.out".to_string();
        let saver = Saver::new(File(path.clone()), SerType::Json).await;
        let test_data = create_test_data();

        saver.push(test_data).await.unwrap();
        let mut content = vec![];
        File::open(path.clone())
            .await
            .unwrap()
            .read_to_end(&mut content)
            .await
            .unwrap();
        fs::remove_file(path).unwrap();

        let correct = r#"[[{"name":"item1","content":"Translations:","related":[{"name":"translations","content":["boxed"],"related":[]}]}]]"#.to_string() + "\n";

        assert_eq!(String::from_utf8(content).unwrap(), correct);
      continue(),
    } continue(),
} continue(),
