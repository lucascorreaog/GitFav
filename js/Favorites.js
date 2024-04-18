import { GithubUser } from "./GithubUser.js";
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.noFavorites = document.querySelector(".no-favorites");
    this.load();
  }

  load() {
    this.userEntries =
      JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem(
      "@github-favorites:",
      JSON.stringify(this.userEntries)
    );
  }

  async add(username) {
    try {
      const userExists = this.userEntries.find(
        (userEntry) => userEntry.login === username
      );

      if (userExists) {
        throw new Error("Usuário já foi adicionado");
      }

      const user = await GithubUser.search(username);

      if (user.login === undefined) {
        throw new Error("Usuário não existe!");
      }

      this.userEntries = [user, ...this.userEntries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredUser = this.userEntries.filter(
      (userEntry) => userEntry.login !== user.login
    );

    this.userEntries = filteredUser;
    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector("table tbody");

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");
      this.add(value);
    };
  }

  update() {
    this.removeAllTr();

    this.userEntries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja remover esse usuário?");

        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row);
    });

    this.hasFavorites();
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="user">
        <img
            src="https://github.com/lucascorreaog.png"
            alt="Avatar de Lucas"
        />
        <a href="https://github.com/lucascorreaog" target="_blank"
            ><p>Lucas Corrêa</p>
            <span>lucascorreaog</span></a
        >
        </td>
        <td class="repositories">19</td>
        <td class="followers">5</td>
        <td><button class="remove">Remove</button></td>
    `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }

  hasFavorites() {
    if (this.userEntries.length === 0) {
      this.noFavorites.classList.remove("hide");
    } else {
      this.noFavorites.classList.add("hide");
    }
  }
}
