#ifndef ucid('10761')
  #ifndef (xec**)

  const ucid == '10761' {
if !== ucid,
  #endif },
else

#include <iostream>
#include <string.h>
#include <stdio.h>
#include <map>
#include <ostream>
#include <fstream>
#define BLOCKSIZE 4096

namespace Color
{
    enum Code
    {
        FG_RED = 31,
        FG_GREEN = 32,
        FG_BLUE = 34,
        FG_DEFAULT = 39,
        BG_RED = 41,
        BG_GREEN = 42,
        BG_BLUE = 44,
        BG_DEFAULT = 49
    };
    class Modifier
    {
        Code code;

    public:
        Modifier(Code pCode) : code(pCode) {}
        friend std::ostream &
        operator<<(std::ostream &os, const Modifier &mod)
        {
            return os << "\033[" << mod.code << "m";
        }
    };
}
using namespace std;

struct super_block
{
    int number_of_inodes;
    int number_of_diskblocks;
    int size_of_blocks;
};

struct inode
{
    int size;
    int first_block;
    char name[80];
};

struct disk_block
{
    int next_block_num;
    int offset;
    char data[BLOCKSIZE];
};

struct super_block sb;
struct inode *inodes;
struct disk_block *disk_blocks;

map<int, string> file_name_fd;
map<int, bool> opened_files;
map<int, int> map_for_file_mode;

map<int, string>::iterator it;

Color::Modifier red(Color::FG_RED);
Color::Modifier green(Color::FG_GREEN);
Color::Modifier blue(Color::FG_BLUE);
// Color::Modifier red(Color::FG_RED);
Color::Modifier bggreen(Color::BG_GREEN);
Color::Modifier bgblue(Color::BG_BLUE);
Color::Modifier bgred(Color::BG_RED);
Color::Modifier def(Color::FG_DEFAULT);
Color::Modifier bgdef(Color::BG_DEFAULT);

string get_user_input()
{
    string input;
    string temp;
    do
    {
        getline(cin, temp);
        if(temp.length() > 6 && temp.substr(temp.length()-6)=="exit()"){
            input+=temp.substr(0, temp.length()-6);
            break;
        }
        if (temp == "exit()")
        {
            
            break;
        }
        input += (temp + '\n');
    } while (temp != "exit()");
    // input.pop_back();
    // input.pop_back();
    // cout<<input[0];
    return input.substr(1, input.length()-1);
}
void printfs(string diskname)
{
    FILE *fp;
    fp = fopen(&diskname[0], "r");
    fread(&sb, sizeof(super_block), 1, fp);

    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        fread(&inodes[i], sizeof(inode), 1, fp);
    }

    for (int i = 0; i < sb.number_of_diskblocks; i++)
    {
        fread(&disk_blocks[i], sizeof(disk_block), 1, fp);
    }

    cout << "Super Block Info\n";
    cout << "Number of disk blocks\t" << sb.number_of_diskblocks << endl;
    cout << "Number of Inodes\t" << sb.number_of_inodes << endl;
    cout << "Size of blocks\t" << sb.size_of_blocks << endl;
    cout << "\nINODES\n\n";
    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        cout << "size: " << inodes[i].size << "\t"
             << "first block: " << inodes[i].first_block << "\t"
             << "name: " << inodes[i].name << endl;
    }
    cout << "\nDISK BLOCKS\n\n";
    for (int i = 0; i < sb.number_of_diskblocks; i++)
    {
        cout << "Block No.: " << i << "\t"
             << "Next Block: " << disk_blocks[i].next_block_num << "\tOffset: "
             << disk_blocks[i].offset << "\tData: "
             << disk_blocks[i].data << endl;
    }
    fclose(fp);
}

void syncfs(string diskname)
{

    FILE *fp;
    fp = fopen(&diskname[0], "w+");

    fwrite(&sb, sizeof(super_block), 1, fp);

    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        fwrite(&inodes[i], sizeof(inode), 1, fp);
    }

    for (int i = 0; i < sb.number_of_diskblocks; i++)
    {
        fwrite(&disk_blocks[i], sizeof(disk_block), 1, fp);
    }

    fclose(fp);
}
void create_disk(string name_of_the_disk)
{
    sb.number_of_inodes = 65536;
    sb.number_of_diskblocks = 122071;
    sb.size_of_blocks = sizeof(disk_block);

    inodes = (inode *)malloc(sizeof(inode) * sb.number_of_inodes);
    disk_blocks = (disk_block *)malloc(sizeof(disk_block) * sb.number_of_diskblocks);

    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        inodes[i].size = -1;
        inodes[i].first_block = -1;
        strcpy(inodes[i].name, "empty");
    }

    for (int i = 0; i < sb.number_of_diskblocks; i++)
    {
        disk_blocks[i].next_block_num = -1;
        disk_blocks[i].offset = 0;
        // disk_blocks[i].data
    }
    syncfs(name_of_the_disk);
    cout << green << "\nDisk created successfully\n\n"
         << def;
    // printfs(name_of_the_disk);
    return;
}

void mount_disk(string diskname)
{
    FILE *fp;
    fp = fopen(&diskname[0], "r");

    fread(&sb, sizeof(super_block), 1, fp);

    inodes = (inode *)malloc(sizeof(inode) * sb.number_of_inodes);
    disk_blocks = (disk_block *)malloc(sizeof(disk_block) * sb.number_of_diskblocks);

    fread(inodes, sizeof(inode), sb.number_of_inodes, fp);

    fread(disk_blocks, sizeof(disk_block), sb.number_of_diskblocks, fp);
    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        if (inodes[i].first_block != -1)
        {
            file_name_fd[i] = inodes[i].name;
            opened_files[i] = false;
            map_for_file_mode[i] = -1;
        }
    }
    // printfs(diskname);
    cout << green << "\nDisk mounted successfully\n\n"
         << def;
    fclose(fp);

    return;
}
int empty_inode()
{
    for (int i = 0; i < sb.number_of_inodes; i++)
    {
        if (inodes[i].first_block == -1)
        {
            return i;
        }
    }
    return -1;
}
int empty_disk()
{
    for (int i = 0; i < sb.number_of_diskblocks; i++)
    {
        if (disk_blocks[i].next_block_num == -1)
        {
            return i;
        }
    }
    return -1;
}
void exit_appl()
{
    exit(0);
    return;
}

int create_file(string file_name, string disk_name)
{
    //find empty inode
    //claim it
    // printfs(disk_name);
    int inode_loc = empty_inode();
    if (inode_loc == -1)
    {
        // error
        cout << "No free location found for inode\n";
        return -1;
    }
    int disk_loc = empty_disk();
    if (disk_loc == -1)
    {
        //error
        cout << "No free location found for disk block\n";
        return -1;
    }
    inodes[inode_loc].first_block = disk_loc;
    strcpy(inodes[inode_loc].name, &file_name[0]);
    disk_blocks[disk_loc].next_block_num = -2;
    syncfs(disk_name);

    return inode_loc;
}

void open_file(int fd)
{
    opened_files[fd] = true;
    int choice;
    cout << "File has been opened\n";
    cout << "Choose the mode to open\n";
    cout << "1. Read mode\n";
    cout << "2. Write mode\n";
    cout << "3. Append mode\n";
    cin >> choice;
    if (choice != 1 && choice != 2 && choice != 3)
    {
        cout << red << "Please choose the right mode\n"
             << def;
        return;
    }
    // cin >> choice;
    map_for_file_mode[fd] = choice;
    cout << "File now opened in the mode specified\n";
    return;
}

void read_file(int fd)
{
    if (map_for_file_mode[fd] != 1)
    {
        cout << red << "The selected file is not opened for read mode\n"
             << def;
        return;
    }
    int bn = inodes[fd].first_block;
    string output;
    // int i=0;

    while (disk_blocks[bn].next_block_num != -2)
    {
        for (int i = 0; i < disk_blocks[bn].offset; i++)
        {
            output.push_back(disk_blocks[bn].data[i]);
        }
        bn = disk_blocks[bn].next_block_num;
    }
    for (int i = 0; i < disk_blocks[bn].offset; i++)
    {
        output.push_back(disk_blocks[bn].data[i]);
    }
    cout << output;
    return;
}

void write_file(int fd)
{
    if (map_for_file_mode[fd] != 2)
    {
        cout << red << "The selected file is not opened for write mode\n"
             << def;
        return;
    }
    // char buffer[BLOCKSIZE];
    string inp = get_user_input();
    int bn = inodes[fd].first_block;
    // int offset;
    while (disk_blocks[bn].next_block_num != -2)
    {
        for(int i=0; i<disk_blocks[bn].offset; i++){
            strcpy(&disk_blocks[bn].data[i],"");
        }
        disk_blocks[bn].offset=-1;
        bn = disk_blocks[bn].next_block_num;
    }
    for (int i = 0; i < disk_blocks[bn].offset; i++)
    {
        strcpy(&disk_blocks[bn].data[i], "");
    }
    disk_blocks[bn].offset=0;
    bn=inodes[fd].first_block;
    // cout<<inp;
    for (int i = 0; i < inp.length(); i++)
    {

        // offset = i % BLOCKSIZE;
        // if (offset == 0 && i != 0)
        // {
        //     if (disk_blocks[bn].next_block_num >= 0)
        //     {
        //         bn = disk_blocks[bn].next_block_num;
        //     }
        //     else
        //     {
        //         bn = empty_disk();
        //         if (bn == -1)
        //         {
        //             cout << "Storage is full\n";
        //             return;
        //         }
        //     }
        // }

        if (disk_blocks[bn].offset == BLOCKSIZE)
        {
            // disk_blocks[bn].offset--;
            if (disk_blocks[bn].next_block_num >= 0)
            {
                bn = disk_blocks[bn].next_block_num;
            }
            else
            {
                bn = empty_disk();
                if (bn == -1)
                {
                    cout << "Storage is full\n";
                    return;
                }
                disk_blocks[bn].next_block_num = -2;
            }
        }
        disk_blocks[bn].data[disk_blocks[bn].offset] = inp[i];
        disk_blocks[bn].offset++;
    }

    return;
}

void append_file(int fd)
{
    if (map_for_file_mode[fd] != 3)
    {
        cout << red << "The selected file is not opened for append mode\n"
             << def;
        return;
    }
    string inp = get_user_input();
    int bn = inodes[fd].first_block;
    while (disk_blocks[bn].next_block_num != -2)
    {
        bn = disk_blocks[bn].next_block_num;
    }
    for (int i = 0; i < inp.length(); i++)
    {

        // offset = i % BLOCKSIZE;
        // if (offset == 0 && i != 0)
        // {
        //     if (disk_blocks[bn].next_block_num >= 0)
        //     {
        //         bn = disk_blocks[bn].next_block_num;
        //     }
        //     else
        //     {
        //         bn = empty_disk();
        //         if (bn == -1)
        //         {
        //             cout << "Storage is full\n";
        //             return;
        //         }
        //     }
        // }

        if (disk_blocks[bn].offset == BLOCKSIZE)
        {
            // disk_blocks[bn].offset--;
            if (disk_blocks[bn].next_block_num >= 0)
            {
                bn = disk_blocks[bn].next_block_num;
            }
            else
            {
                bn = empty_disk();
                if (bn == -1)
                {
                    cout << "Storage is full\n";
                    return;
                }
                disk_blocks[bn].next_block_num = -2;
            }
        }
        disk_blocks[bn].data[disk_blocks[bn].offset] = inp[i];
        disk_blocks[bn].offset++;
    }
    return;
}

void close_file(int fd)
{
    map_for_file_mode[fd] = -1;
    opened_files[fd] = false;
    cout << green << "File closed successfully\n"
         << def;
    return;
}

int delete_file(int fd)
{
    if (opened_files[fd])
    {
        cout << red << "File is opened.. please close it before deleting\n"
             << def;
        return 0;
    }
    int bn = inodes[fd].first_block;
    while (disk_blocks[bn].next_block_num != -2)
    {
        for (int i = 0; i < disk_blocks[bn].offset; i++)
        {
            strcpy(disk_blocks[bn].data, "");
        }
        disk_blocks[bn].offset = -1;
        int temp = disk_blocks[bn].next_block_num;
        disk_blocks[bn].next_block_num = -1;
        bn = temp;
    }
    for (int i = 0; i < disk_blocks[bn].offset; i++)
    {
        strcpy(disk_blocks[bn].data, "");
    }
    disk_blocks[bn].offset = -1;
    disk_blocks[bn].next_block_num = -1;

    strcpy(inodes[fd].name, "empty");
    inodes[fd].first_block = -1;
    file_name_fd.erase(fd);
    map_for_file_mode.erase(fd);
    opened_files.erase(fd);
    return 1;
}

void list_of_files()
{
    if (file_name_fd.size() == 0)
    {
        cout << "No files have been created yet\n";
    }
    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
    {
        cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
    }
    return;
}

void list_of_opened_files()
{
    int count = 0;
    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
    {
        if (opened_files[it->first])
        {
            string mode;
            if(map_for_file_mode[it->first]==1){
                mode="READ";
            }else if(map_for_file_mode[it->first]==2){
                mode="WRITE";
            }else{
                mode="APPEND";
            }
            cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first <<"\tFile mode: "<<mode<<def << endl;
            count++;
        }
    }

    if (count == 0)
    {
        cout << "No files are opened at this moment\n";
    }

    return;
}

void unmount(string diskname)
{
    syncfs(diskname);
    map_for_file_mode.clear();
    file_name_fd.clear();
    opened_files.clear();
    // for(int i=0; i<sb.number_of_inodes; i++){
    //     free(&inodes[i]);
    // }
    // for(int i=0; i<sb.number_of_diskblocks; i++){
    //     free(&disk_blocks[i]);
    // }
    return;
}

int main()
{
    string choicex, choicey;
    int fd;
    string file_name;
    string disk_name;
    // get_user_input();
    while (1)
    {

        // cout <<bgblue<< "This ->" << red << "word" << def<<"<- is red." <<bgdef
        // << endl;
        cout << "Which operation would you like to perform?\n";
        cout << "1. Create Disk\n2. Mount Disk\n3. Exit\n";
        cin >> choicex;
        if (choicex == "1")
        {
            string name_of_the_disk;
            // cout<<
            cout << "Enter the disk name\n";
            cin >> name_of_the_disk;
            create_disk(name_of_the_disk);
        }
        else if (choicex == "2")
        {
            cout << "Enter the disk name\n";
            cin >> disk_name;
            mount_disk(disk_name);
            while (1)
            {
                cout << "\n===========================\n";
                cout << "\n1. Create File";
                cout << "\n2. Open File";
                cout << "\n3. Read File";
                cout << "\n4. Write File";
                cout << "\n5. Append File";
                cout << "\n6. Close File";
                cout << "\n7. Delete File";
                cout << "\n8. List of Files";
                cout << "\n9. List of opened Files";
                cout << "\n10 Unmount\n";
                cout << "===========================\n\n";

                cin >> choicey;
                if (choicey == "1")
                {

                    cout << "Enter file name:\n";
                    cin >> file_name;
                    fd = create_file(file_name, disk_name);
                    if (fd == -1)
                    {
                        cout << red << "Couldn't create the file\n"
                             << def;
                        continue;
                    }
                    cout << green << "File created! here is the descriptor: " << fd << def << endl;
                    file_name_fd[fd] = file_name;
                    // printfs(disk_name);
                }
                else if (choicey == "2")
                {
                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {

                        cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                    }
                    cout << "Choose the file desciptor to open\n";
                    cin >> fd;
                    open_file(fd);
                }
                else if (choicey == "3")
                {
                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {
                        if (opened_files[it->first])
                        {
                            cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                        }
                    }
                    cout << "Choose the file desciptor to read\n";
                    cin >> fd;
                    read_file(fd);
                }
                else if (choicey == "4")
                {
                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {
                        if (opened_files[it->first])
                        {
                            cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                        }
                    }
                    cout << "Choose the file desciptor to write\n";
                    cin >> fd;
                    write_file(fd);
                }
                else if (choicey == "5")
                {
                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {
                        if (opened_files[it->first])
                        {
                            cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                        }
                    }
                    cout << "Choose the file desciptor to append\n";
                    cin >> fd;
                    append_file(fd);
                }
                else if (choicey == "6")
                {

                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {
                        if (opened_files[it->first])
                        {
                            cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                        }
                    }
                    cout << "Choose the fd to close\n";
                    cin >> fd;
                    close_file(fd);
                }
                else if (choicey == "7")
                {
                    for (it = file_name_fd.begin(); it != file_name_fd.end(); it++)
                    {
                        cout << blue << "File: " << it->second << "\tFile Descriptor: " << it->first << def << endl;
                    }
                    cout << "Choose the fd to delete\n";
                    cin >> fd;
                    if (delete_file(fd))
                    {
                        cout << green << "File deleted successfully\n"
                             << def;
                    }
                }
                else if (choicey == "8")
                {

                    list_of_files();
                }
                else if (choicey == "9")
                {
                    list_of_opened_files();
                }
                else if (choicey == "10")
                {
                    // cout << "Enter the disk name\n";
                    // cin>>disk_name;
                    unmount(disk_name);
                    cout << green << "Disk unmounted successfully\n"
                         << def;
                    break;
                }
                else
                {
                    cout << red << "Wrong choice.. enter again\n"
                         << def;
                    continue;
                }
            }
        }
        else if (choicex == "3")
        {
            exit_appl();
            break;
        }
        else
        {
            cout << red << "Wrong choice.. enter again\n"
                 << def;
            continue;
        }
    }
    return 0;
}
